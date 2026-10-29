---
title: TLS 종료
tags: [network, seed]
status: unexplored
note_type: seed
sensitivity: public
post_format: none
cards: false
prerequisite: []
part_of: ["[[네트워크와 방화벽]]"]
compared_with: []
captured_at:
published_at:
generated_at: 2026-10-29
---

> 씨앗 노트: 다른 노트를 정리하다 나온 연관 개념이다. 아직 질문하지 않았다. 궁금해지면 inbox에 질문을 남기면 답 노트로 키운다.

## 한 줄 설명
클라이언트와의 TLS(HTTPS) 암호화를 서버가 아니라 로드밸런서에서 풀고, 뒤쪽 서버에는 풀린(또는 다시 암호화한) 트래픽을 보내는 구성이다. 인증서를 장비에 둔다.

## 어디서 나왔나
- [[L4 포트 오픈 여부와 방화벽 상태]]의 다음에 볼 개념

## 더 보기
- [AWS: Listeners for your Network Load Balancers](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-listeners.html)

## 원본 메모
(아직 없음)
