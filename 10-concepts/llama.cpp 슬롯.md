---
title: llama.cpp 슬롯
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
llama.cpp 서버의 동시 처리 칸이다. 칸마다 컨텍스트를 보장하려면 KV 캐시 전체(`--ctx-size`)를 칸 수 × 칸당 토큰으로 잡는다. Ollama가 쓰는 `llama-server`의 동작이다.

## 어디서 나왔나
- [[vLLM과 Ollama 동시성 차이]]의 선행 개념

## 더 보기
- [llama.cpp 토론 #4130](https://github.com/ggml-org/llama.cpp/discussions/4130)
- [ollama/llama README](https://github.com/ollama/ollama/blob/main/llama/README.md)

## 원본 메모
(아직 없음)
