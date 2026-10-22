---
title: RabbitMQ prefetch
tags: [rabbitmq, messaging, flashcards, example]
status: draft
sensitivity: public
post_format: none
cards: true
prerequisite: ["[[RabbitMQ ack 모드]]"]
part_of: ["[[RabbitMQ 메시지 흐름]]"]
compared_with: []
captured_at: 2026-10-18
published_at:
generated_at: 2026-10-18
---

> 예시 노트입니다. 형식 확인 후 지워도 됩니다.

## 원본 메모
(예시) 메시지가 컨슈머 한 대에만 몰렸음. prefetch를 낮추고 수동 ack로 바꿔서 해결

## 정리
prefetch(QoS)는 컨슈머가 ack를 보내기 전에 미리 받아둘 수 있는 메시지 수다. 값이 크면 먼저 연결된 컨슈머가 메시지를 많이 가져가 부하가 쏠린다.

## 복습 카드
prefetch 값이 너무 크면 생기는 문제는?::한 컨슈머에 메시지가 몰려 부하가 쏠린다
prefetch는 무엇을 제한하는가?::ack 전에 컨슈머가 미리 받아둘 수 있는 메시지 수
<!--SR:!2026-10-23,1,230-->
