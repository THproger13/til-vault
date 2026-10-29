---
title: SNAT와 DSR
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
L4 장비의 응답 경로를 정하는 두 방식이다. SNAT는 장비가 출발지 IP를 자기 IP로 바꿔 응답이 반드시 장비를 거쳐 돌아오게 하고, DSR(Direct Server Return)은 서버가 장비를 거치지 않고 클라이언트에게 바로 응답한다.

## 어디서 나왔나
- [[L4 포트 오픈 여부와 방화벽 상태]]의 다음에 볼 개념

## 더 보기
- [F5: About SNATs](https://techdocs.f5.com/en-us/bigip-14-1-0/big-ip-tmos-routing-administration-14-1-0/nats-and-snats/about-snats.html)
- [Creating Linux Virtual Servers (LVS 문서)](https://linux-vs.org/Joseph.Mack/linuxexpo99/linuxexpo2.html)

## 원본 메모
(아직 없음)
