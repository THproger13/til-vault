---
title: OverlayFS
tags: [container, linux, seed]
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
아래(lower) 파일시스템 위에 위(upper) 파일시스템을 겹쳐 하나로 합친(merged) 모습을 보여 주는 파일시스템이다. 아래 파일을 고치려 하면 먼저 위로 복사(copy_up)한다. 컨테이너 저장소의 `overlay/` 폴더가 이 방식으로 이미지 레이어와 컨테이너 쓰기 층을 겹친다.

## 어디서 나왔나
- [[Podman과 Docker 엔진 차이]]의 다음에 볼 개념

## 더 보기
- [Overlay Filesystem (Linux kernel 문서)](https://docs.kernel.org/filesystems/overlayfs.html)

## 원본 메모
(아직 없음)
