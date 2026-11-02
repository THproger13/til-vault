---
title: rootless 컨테이너
tags: [container, seed]
status: unexplored
note_type: seed
sensitivity: public
post_format: none
cards: false
prerequisite: []
part_of: ["[[컨테이너 엔진]]"]
compared_with: []
captured_at:
published_at:
generated_at: 2026-11-02
---

> 씨앗 노트: 다른 노트를 정리하다 나온 연관 개념이다. 아직 질문하지 않았다. 궁금해지면 inbox에 질문을 남기면 답 노트로 키운다.

## 한 줄 설명
root가 아닌 일반 계정으로 컨테이너를 띄우는 방식이다. Podman은 계정마다 저장소가 따로라서(기본 `$HOME/.local/share/containers/storage`) 일반 계정에서는 root가 띄운 컨테이너가 보이지 않는다.

## 어디서 나왔나
- [[Podman과 Docker 엔진 차이]]의 다음에 볼 개념

## 더 보기
- [RHEL 8: Starting with containers](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/8/html/building_running_and_managing_containers/assembly_starting-with-containers_building-running-and-managing-containers)
- [containers-storage.conf(5)](https://github.com/containers/storage/blob/main/docs/containers-storage.conf.5.md)

## 원본 메모
(아직 없음)
