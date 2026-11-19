---
title: PostgreSQL 스트리밍 복제
tags: [ha, seed]
status: unexplored
note_type: seed
sensitivity: public
post_format: none
cards: false
prerequisite: []
part_of: []
compared_with: []
captured_at: 2026-11-18
published_at:
generated_at: 2026-11-19
---

> 씨앗 노트: 다른 노트를 정리하다 나온 연관 개념이다. 아직 질문하지 않았다. 궁금해지면 inbox에 질문을 남기면 답 노트로 키운다.

## 한 줄 설명
대기 서버가 주 서버의 WAL 기록 흐름을 받아 최신 상태를 유지하는 방식이다. 대기 서버는 평소에도 PG를 켜 두므로 포트를 쓴다.

## 어디서 나왔나
- [[공유 디스크 HA와 스트리밍 복제 HA 차이]]·[[PostgreSQL 복제 슬롯]]의 선행 개념

## 더 보기
- [PostgreSQL 18: Comparison of Different Solutions](https://www.postgresql.org/docs/current/different-replication-solutions.html)

## 원본 메모
(아직 없음)
