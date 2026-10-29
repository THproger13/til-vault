---
title: RabbitMQ ack 모드
tags: [messaging, rabbitmq, seed]
status: unexplored
note_type: seed
sensitivity: public
post_format: none
cards: false
prerequisite: []
part_of: ["[[메시지 큐]]"]
compared_with: []
captured_at:
published_at:
generated_at: 2026-10-29
---

> 씨앗 노트: 다른 노트를 정리하다 나온 연관 개념이다. 아직 질문하지 않았다. 궁금해지면 inbox에 질문을 남기면 답 노트로 키운다.

## 한 줄 설명
ack(acknowledgement)는 소비자가 메시지를 처리했다고 브로커에 알리는 응답이고, ack 모드는 그 방식이다. 자동 ack는 보내는 순간 성공으로 처리해서 소비자가 죽으면 메시지가 사라지고, 수동 ack는 ack 전에 연결이 끊긴 메시지를 큐로 다시 돌려보낸다.

Spring AMQP의 `AUTO`는 RabbitMQ 자동 ack가 아니라 컨테이너가 리스너 결과를 보고 ack/nack하는 방식이고, RabbitMQ 자동 ack는 Spring에서 `NONE`이다.

## 어디서 나왔나
- [[DLQ]]의 선행 개념

## 더 보기
- [Spring AMQP: AcknowledgeMode](https://docs.spring.io/spring-amqp/api/org/springframework/amqp/core/AcknowledgeMode.html)
- [RabbitMQ: Consumer Acknowledgements](https://www.rabbitmq.com/docs/confirms)

## 원본 메모
(아직 없음)
