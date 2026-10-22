---
name: inbox-organize
description: "inbox 정리해줘" 또는 토요일 예약 작업에서 00-inbox 메모를 개념 노트로 정리한다.
---
# inbox 정리

먼저 `CLAUDE.md`와 `index.md`만 읽는다. 볼트 전체를 읽지 않는다.

1. `00-inbox/`에서 오래된 순으로 최대 10개를 고른다. 나머지는 그대로 둔다.
2. `captured_at`이 4주 넘게 지난 메모는 정리하지 않고 `archive/`로 옮긴다.
3. 각 메모를 개념 단위로 쪼갠다. `index.md`에 같은 개념이 있으면 새 노트를 만들지 않고 그 노트에 원본 메모를 덧붙인다(그 노트가 `draft`/`unexplored`일 때만. 아니면 "보강 제안" 섹션에).
4. 새 노트는 `templates/concept.md` 형식으로 `10-concepts/`에 만든다.
   - "원본 메모"에 inbox 대답을 그대로 옮긴다.
   - `prerequisite`, `part_of`, `compared_with`를 채운다. 아직 없는 개념도 링크로 적어도 된다(지도의 안개가 된다).
   - 다이어그램은 `part_of` 부모 노트에 하나. 부모 노트가 없으면 부모 노트를 만든다.
   - 카드 3~5장. 외울 가치가 없으면 `cards: false`, 카드 없음. 확신이 낮은 카드가 있으면 `check` 태그.
   - `status: draft`, `post_format: none`, `captured_at`은 inbox 메모의 값.
5. 정리한 inbox 메모는 `archive/inbox-done/`으로 옮긴다.
6. `index.md`에 새 노트 한 줄씩 추가한다.
7. 금칙어(`config/forbidden-words.txt`)가 남아 있지 않은지 확인한다.
8. 결과를 짧게 보고한다: 만든 노트 수, `check` 노트 목록, 보관한 메모 수.
