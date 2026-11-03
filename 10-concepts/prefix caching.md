---
title: prefix caching
tags: [llm, seed]
status: unexplored
note_type: seed
sensitivity: public
post_format: none
cards: false
prerequisite: []
part_of:
  - "[[LLM 서빙]]"
compared_with: []
captured_at:
published_at:
generated_at: 2026-11-03
---

> 씨앗 노트: 다른 노트를 정리하다 나온 연관 개념이다. 아직 질문하지 않았다. 궁금해지면 inbox에 질문을 남기면 답 노트로 키운다.

## 한 줄 설명
같은 접두어를 가진 요청이 이미 계산된 KV 캐시 블록을 재사용해 프롬프트 계산을 건너뛰는 최적화다. vLLM은 블록을 해시로 찾고, 오래 안 쓴 블록부터 내보낸다.

## 어디서 나왔나
- [[KV 캐시]]의 다음에 볼 개념

## 더 보기
- [Automatic Prefix Caching](https://docs.vllm.ai/en/stable/design/prefix_caching/)

## 원본 메모
(아직 없음)
