---
name: seed-map
description: "시즌 지도 만들어줘", "씨앗 심어줘" 요청 시에만 한 영역의 개념 씨앗(unexplored 노트)을 만든다.
---
# 시즌 씨앗

1. 영역 이름과 시즌 코드(예: 2026-S1)를 확인한다. 이번 시즌 영역이 이미 2개면 더 만들지 않는다.
2. 공식 문서 목차를 기준으로 그 영역의 핵심 개념 15~30개를 고른다. 웹 검색으로 실제 목차를 확인한다.
3. 상한 확인: 전체 `unexplored` 노트가 100개를 넘으면 중단하고 알린다.
4. 이미 `index.md`에 있는 개념은 만들지 않고 `season`만 붙인다.
5. 새 노트: `templates/concept.md` 형식, `status: unexplored`, `season: <코드>`, 영역 태그, `prerequisite`·`part_of` 관계만 채운다. 본문은 "## 원본 메모"를 비워 둔다. 카드는 만들지 않는다.
6. `index.md`에 추가하고, `dashboards/시즌 진행률.base`의 season 값을 바꿔야 하면 사용자에게 알린다.
