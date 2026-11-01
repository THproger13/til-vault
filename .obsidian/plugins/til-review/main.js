/*
 * TIL 빈칸 복습 (til-vault 전용 플러그인, 빌드 없이 쓰는 순수 JS)
 *
 * 카드 형식: 개념 노트의 "## 복습 카드" 섹션에서 ==키워드== 가 들어간 줄 하나 = 카드 하나.
 *   - 빈칸 정답이 여러 표현이면 ==ack|확인 응답== 처럼 | 로 나눈다 (앞의 것이 대표 답).
 *   - 일정은 줄 끝 주석에 저장: <!--til:다음복습일,간격(일),복습횟수,맞힌횟수-->
 * 노트 속성(자동 계산): review_count, accuracy, last_reviewed, next_review
 */
const obsidian = require("obsidian");
const { Plugin, Modal, Notice, TFile } = obsidian;

const CONCEPT_FOLDER = "10-concepts/";
const CARD_HEADING = /^##\s+복습 카드\s*$/;
const CLOZE_RE = /==([^=]+?)==/g;
const SCHED_RE = /\s*<!--til:(\d{4}-\d{2}-\d{2}),(\d+),(\d+),(\d+)-->\s*$/;
const INTERVALS = [1, 3, 7, 14, 30];

/* ---------- 순수 함수 (테스트 대상) ---------- */

function today() {
  return fmtDate(new Date());
}

function fmtDate(d) {
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function addDays(dateStr, days) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return fmtDate(new Date(y, m - 1, d + days));
}

function normalize(s) {
  return String(s)
    .normalize("NFC")
    .toLowerCase()
    .replace(/[\s·.,/()\[\]\-_'"`:;!?~]/g, "");
}

function isCorrect(input, alternatives) {
  const n = normalize(input);
  if (!n) return false;
  return alternatives.some((a) => normalize(a) === n);
}

/** 카드 줄에서 일정 주석을 뗀 본문 (줄 식별 키) */
function cardKey(line) {
  return line.replace(SCHED_RE, "").trim();
}

function parseSchedule(line) {
  const m = line.match(SCHED_RE);
  if (!m) return null;
  return { due: m[1], interval: +m[2], reviews: +m[3], correct: +m[4] };
}

/** 카드 본문을 텍스트·빈칸 조각으로 나눈다 */
function splitCloze(text) {
  const body = text.replace(/^[-*+]\s+/, "");
  const parts = [];
  let last = 0;
  let m;
  CLOZE_RE.lastIndex = 0;
  while ((m = CLOZE_RE.exec(body)) !== null) {
    if (m.index > last) parts.push({ type: "text", value: body.slice(last, m.index) });
    const alts = m[1].split("|").map((s) => s.trim()).filter(Boolean);
    parts.push({ type: "blank", answer: alts[0], alternatives: alts });
    last = m.index + m[0].length;
  }
  if (last < body.length) parts.push({ type: "text", value: body.slice(last) });
  return parts;
}

/** 노트 본문에서 카드 목록을 뽑는다 */
function parseCards(content) {
  const lines = content.split("\n");
  const cards = [];
  let inSection = false;
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    if (inFence) continue;
    if (/^#{1,2}\s/.test(line)) {
      inSection = CARD_HEADING.test(line);
      continue;
    }
    if (!inSection) continue;
    const key = cardKey(line);
    if (!key || !/==[^=]+?==/.test(key)) continue;
    cards.push({ line: i, key, parts: splitCloze(key), schedule: parseSchedule(line) });
  }
  return cards;
}

function isDue(card, onDate) {
  return !card.schedule || card.schedule.due <= onDate;
}

/** 카드 줄의 일정을 바꾼 새 본문을 돌려준다. 카드를 못 찾으면 null */
function applyReview(content, key, ok, intervalDays, onDate) {
  const lines = content.split("\n");
  const cards = parseCards(content);
  const card = cards.find((c) => c.key === key);
  if (!card) return null;
  const prev = card.schedule || { reviews: 0, correct: 0 };
  const due = addDays(onDate, intervalDays);
  const sched = `<!--til:${due},${intervalDays},${prev.reviews + 1},${prev.correct + (ok ? 1 : 0)}-->`;
  const raw = lines[card.line].replace(SCHED_RE, "").replace(/\s+$/, "");
  lines[card.line] = `${raw} ${sched}`;
  return lines.join("\n");
}

/** 노트 속성으로 쓸 요약값 */
function summarize(content, onDate) {
  const cards = parseCards(content);
  let reviews = 0;
  let correct = 0;
  let next = null;
  for (const c of cards) {
    const s = c.schedule;
    if (s) {
      reviews += s.reviews;
      correct += s.correct;
    }
    const due = s ? s.due : onDate;
    if (!next || due < next) next = due;
  }
  return {
    cards: cards.length,
    review_count: reviews,
    accuracy: reviews ? Math.round((correct / reviews) * 100) : null,
    next_review: next,
  };
}

function suggestInterval(ok, prevInterval) {
  if (!ok) return 1;
  const target = Math.max(3, (prevInterval || 0) * 2);
  return INTERVALS.find((d) => d >= target) || 30;
}

/* ---------- 복습 화면 ---------- */

class ReviewModal extends Modal {
  constructor(plugin, queue, title) {
    super(plugin.app);
    this.plugin = plugin;
    this.queue = queue; // [{file, card}]
    this.title = title;
    this.idx = 0;
    this.done = 0;
    this.right = 0;
  }

  onOpen() {
    this.modalEl.addClass("til-review-modal");
    this.render();
  }

  onClose() {
    this.detachKeys();
    this.contentEl.empty();
    this.plugin.refreshStatus();
  }

  detachKeys() {
    if (this._keyHandler) document.removeEventListener("keydown", this._keyHandler, true);
    window.clearTimeout(this._keyTimer);
    this._keyHandler = null;
  }

  render() {
    this.detachKeys();
    const el = this.contentEl;
    el.empty();
    if (this.idx >= this.queue.length) {
      el.createEl("h3", { text: "복습 끝" });
      el.createEl("p", {
        text: this.done ? `${this.done}장 복습, ${this.right}장 맞힘.` : "복습할 카드가 없어요.",
      });
      const btn = el.createEl("button", { text: "닫기", cls: "mod-cta" });
      btn.onclick = () => this.close();
      return;
    }

    const { file, card } = this.queue[this.idx];
    const head = el.createDiv({ cls: "til-review-head" });
    head.createSpan({ text: `${this.title} · ${this.idx + 1}/${this.queue.length}` });
    const link = head.createEl("a", { text: file.basename, cls: "til-review-note" });
    link.onclick = () => {
      this.app.workspace.getLeaf(false).openFile(file);
      this.close();
    };

    const sentence = el.createDiv({ cls: "til-review-sentence" });
    const inputs = [];
    for (const part of card.parts) {
      if (part.type === "text") {
        renderInline(sentence, part.value);
      } else {
        const input = sentence.createEl("input", { type: "text", cls: "til-review-blank" });
        input.style.width = `${Math.max(4, Math.min(24, part.answer.length + 2))}em`;
        input.setAttr("autocomplete", "off");
        input.setAttr("spellcheck", "false");
        inputs.push({ input, part });
      }
    }

    const result = el.createDiv({ cls: "til-review-result" });
    const actions = el.createDiv({ cls: "til-review-actions" });
    const check = actions.createEl("button", { text: "확인 (Enter)", cls: "mod-cta" });
    const reveal = actions.createEl("button", { text: "모르겠음" });

    const grade = (giveUp) => {
      let ok = !giveUp;
      for (const { input, part } of inputs) {
        const good = !giveUp && isCorrect(input.value, part.alternatives);
        ok = ok && good;
        input.disabled = true;
        input.addClass(good ? "is-correct" : "is-wrong");
        if (!good) {
          const ans = createSpan({ cls: "til-review-answer", text: part.answer });
          input.insertAdjacentElement("afterend", ans);
        }
      }
      actions.empty();
      this.showIntervals(result, card, file, ok);
    };

    check.onclick = () => grade(false);
    reveal.onclick = () => grade(true);
    inputs.forEach(({ input }, i) => {
      input.addEventListener("keydown", (e) => {
        if (e.key !== "Enter" || e.isComposing) return;
        e.preventDefault();
        if (i < inputs.length - 1 && !e.shiftKey && !inputs[i + 1].input.value) {
          inputs[i + 1].input.focus();
        } else {
          grade(false);
        }
      });
    });
    if (inputs[0]) setTimeout(() => inputs[0].input.focus(), 0);
  }

  showIntervals(result, card, file, ok) {
    let correct = ok;
    result.empty();
    const verdict = result.createDiv({ cls: correct ? "til-review-ok" : "til-review-ng" });
    const setVerdict = () => {
      verdict.setText(correct ? "맞았어요" : "틀렸어요 — 빨간 칸 옆이 정답");
      verdict.className = correct ? "til-review-ok" : "til-review-ng";
    };
    setVerdict();
    if (!ok) {
      const fix = result.createEl("button", { text: "오타라서 맞은 걸로", cls: "til-review-fix" });
      fix.onclick = () => {
        correct = true;
        setVerdict();
        fix.remove();
        drawButtons();
      };
    }

    const prev = card.schedule ? card.schedule.interval : 0;
    result.createDiv({ cls: "til-review-ask", text: "다음 복습은 언제? 숫자키 1~5로 고르거나 Enter = 파란 버튼(추천)" });
    const row = result.createDiv({ cls: "til-review-intervals" });
    const t = today();

    let saving = false;
    const choose = async (days) => {
      if (saving) return;
      saving = true;
      this.detachKeys();
      await this.plugin.recordReview(file, card.key, correct, days);
      this.done += 1;
      if (correct) this.right += 1;
      this.idx += 1;
      this.render();
    };

    const drawButtons = () => {
      row.empty();
      const sug = suggestInterval(correct, prev);
      INTERVALS.forEach((d, i) => {
        const b = row.createEl("button", {
          text: `[${i + 1}] ${d}일 (${addDays(t, d).slice(5)})`,
          cls: d === sug ? "mod-cta" : "",
        });
        b.onclick = () => choose(d);
      });
      const custom = row.createEl("input", { type: "number", cls: "til-review-custom" });
      custom.placeholder = "직접(일)";
      custom.min = "1";
      custom.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const n = parseInt(custom.value, 10);
          if (n > 0) choose(n);
        }
        e.stopPropagation();
      });
      row.dataset.suggest = String(sug);
    };
    drawButtons();

    const keyHandler = (e) => {
      if (e.target && e.target.classList && e.target.classList.contains("til-review-custom")) return;
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= INTERVALS.length) {
        e.preventDefault();
        choose(INTERVALS[n - 1]);
      } else if (e.key === "Enter") {
        e.preventDefault();
        choose(parseInt(row.dataset.suggest, 10));
      }
    };
    // 채점 직후 Enter가 바로 넘어가지 않도록 한 박자 늦게 건다
    this._keyHandler = keyHandler;
    this._keyTimer = window.setTimeout(() => {
      if (this._keyHandler === keyHandler) document.addEventListener("keydown", keyHandler, true);
    }, 150);
  }
}

/** `코드`만 살리고 나머지는 글자 그대로 */
function renderInline(parent, text) {
  const segs = text.split(/(`[^`]+`)/);
  for (const s of segs) {
    if (!s) continue;
    if (s.startsWith("`") && s.endsWith("`")) parent.createEl("code", { text: s.slice(1, -1) });
    else parent.appendText(s);
  }
}

/* ---------- 플러그인 ---------- */

class TilReviewPlugin extends Plugin {
  async onload() {
    this.statusEl = this.addStatusBarItem();
    this.statusEl.addClass("mod-clickable");
    this.statusEl.onclick = () => this.reviewDue();

    this.addRibbonIcon("brain", "TIL 빈칸 복습 (오늘 할 카드)", () => this.reviewDue());

    this.addCommand({ id: "review-due", name: "오늘 복습할 카드 풀기", callback: () => this.reviewDue() });
    this.addCommand({
      id: "review-current",
      name: "지금 노트의 카드 전부 풀기",
      checkCallback: (checking) => {
        const f = this.app.workspace.getActiveFile();
        if (!this.isConcept(f)) return false;
        if (!checking) this.reviewFile(f);
        return true;
      },
    });
    this.addCommand({
      id: "mark-blog",
      name: "이 노트를 블로그 초안 대상으로 (status: blog)",
      checkCallback: (checking) => {
        const f = this.app.workspace.getActiveFile();
        if (!this.isConcept(f)) return false;
        if (!checking) this.markBlog(f);
        return true;
      },
    });

    this.app.workspace.onLayoutReady(() => this.refreshStatus());
    this.registerEvent(this.app.vault.on("modify", (f) => this.isConcept(f) && this.scheduleRefresh()));
    this.registerInterval(window.setInterval(() => this.refreshStatus(), 30 * 60 * 1000));
  }

  isConcept(f) {
    return f instanceof TFile && f.extension === "md" && f.path.startsWith(CONCEPT_FOLDER);
  }

  conceptFiles() {
    return this.app.vault.getMarkdownFiles().filter((f) => this.isConcept(f));
  }

  scheduleRefresh() {
    window.clearTimeout(this._t);
    this._t = window.setTimeout(() => this.refreshStatus(), 2000);
  }

  async collect(onlyDue) {
    const t = today();
    const queue = [];
    for (const file of this.conceptFiles()) {
      const content = await this.app.vault.cachedRead(file);
      for (const card of parseCards(content)) {
        if (!onlyDue || isDue(card, t)) queue.push({ file, card });
      }
    }
    // 밀린 카드(오래된 날짜) 먼저, 새 카드는 뒤로
    queue.sort((a, b) => {
      const da = a.card.schedule ? a.card.schedule.due : "9999";
      const db = b.card.schedule ? b.card.schedule.due : "9999";
      return da < db ? -1 : da > db ? 1 : 0;
    });
    return queue;
  }

  async refreshStatus() {
    const due = await this.collect(true);
    this.statusEl.setText(due.length ? `복습 ${due.length}장` : "복습 0장");
  }

  async reviewDue() {
    const queue = await this.collect(true);
    if (!queue.length) {
      new Notice("오늘 복습할 카드가 없어요.");
      return;
    }
    new ReviewModal(this, queue, "오늘 복습").open();
  }

  async reviewFile(file) {
    const content = await this.app.vault.cachedRead(file);
    const queue = parseCards(content).map((card) => ({ file, card }));
    if (!queue.length) {
      new Notice("이 노트에는 ==빈칸== 카드가 없어요.");
      return;
    }
    new ReviewModal(this, queue, file.basename).open();
  }

  async recordReview(file, key, ok, days) {
    const t = today();
    let written = false;
    let summary = null;
    await this.app.vault.process(file, (data) => {
      const next = applyReview(data, key, ok, days, t);
      if (next === null) return data;
      written = true;
      summary = summarize(next, t);
      return next;
    });
    if (!written) {
      new Notice(`카드를 찾지 못해 기록하지 못했어요: ${file.basename}`);
      return;
    }
    await this.app.fileManager.processFrontMatter(file, (fm) => {
      fm.review_count = summary.review_count;
      fm.accuracy = summary.accuracy;
      fm.last_reviewed = t;
      fm.next_review = summary.next_review;
    });
  }

  async markBlog(file) {
    const fm = (this.app.metadataCache.getFileCache(file) || {}).frontmatter || {};
    if (fm.sensitivity === "internal") {
      new Notice("sensitivity: internal 노트는 블로그 초안 대상으로 바꿀 수 없어요.");
      return;
    }
    await this.app.fileManager.processFrontMatter(file, (f) => {
      f.status = "blog";
      f.blog_requested_at = today();
    });
    new Notice("status: blog — 다음 저녁 작업(평일 18:07·주말 14:07)에서 초안이 만들어져요.");
  }
}

module.exports = TilReviewPlugin;
module.exports.default = TilReviewPlugin;
module.exports._pure = {
  normalize,
  isCorrect,
  splitCloze,
  parseCards,
  parseSchedule,
  applyReview,
  summarize,
  suggestInterval,
  addDays,
  isDue,
};
