---
name: publish-guard
description: 발행 직전 "발행 검사해줘" 요청 시 초안의 보안·품질 필수 항목을 검사한다.
---
# 발행 검사

대상: `20-posts/drafts/`의 초안 하나.

검사하고 결과를 통과/실패 표로 보여준다. 하나라도 실패면 발행하지 말라고 한다.
1. 금칙어: `config/forbidden-words.txt`의 단어(대소문자 무시), IP 주소 패턴, 사내 URL 패턴
2. 원본 노트(`source_notes`)에 `sensitivity: internal`이 있는지
3. Mermaid 코드블록이 1개 이상이고, 문법이 맞는지(가능하면 mermaid-cli로)
4. 짧은 글 최소 기준: 도표 1개, 경험 문단 1개("[직접 작성]" 남아 있으면 실패), 공식 출처 1개
5. 템플릿 필수 섹션: 요약, 문제 상황, 원리, 직접 해본 결과, 참고 자료, 작성일
6. 제휴 링크가 있으면 대가 표기 문구가 있는지
7. 위키링크 `[[...]]`가 남아 있으면 경고 (발행 스크립트가 변환하기 전이면 정상)

통과하면: 초안을 `20-posts/published/`로 옮기고 `published_at`을 오늘로, 원본 개념 노트의 `status: published`, `published_at`을 갱신할지 사용자에게 확인한다.
