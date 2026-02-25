# Project Overview

## Project Title
정신건강 포털 포트폴리오 페이지 구축

## Main Objective
루트 폴더의 `index.html`을 `https://www.mentalhealth.go.kr/portal/main/index.do` 사이트의 포트폴리오로 성공적으로 구축했습니다. `mental_health_portfolio/index-1.html`에서 가져온 콘텐츠와 디자인을 기반으로, 절대 경로로 되어있던 에셋들을 상대 경로로 모두 변환하여 페이지를 원본과 동일하게 구동시킴으로써 **작업 능력(기술적 역량)**을 효과적으로 보여주는 것을 목표로 합니다.

## Key Objectives (완료된 사항)
1.  `mental_health_portfolio/index-1.html`의 HTML 내용을 기반으로 루트 `index.html`을 구성.
2.  `index.html` 내 모든 CSS, JavaScript, 이미지, 폰트 등의 에셋 경로를 현재 `index.html`의 상대 경로 구조를 기준으로 `mental_health_portfolio/` 접두어를 사용하는 상대 경로로 정확하게 변환.
3.  변환된 페이지가 원본과 동일하게 정상적으로 작동하고 시각적으로 일관성을 유지하는지 철저히 확인.
4.  프로젝트의 목적에 맞지 않는 불필요한 외부 CDN 참조 및 스크립트를 정리.

## Scope (완료된 사항)
*   루트 `index.html` 파일의 생성 및 내용 구성.
*   `mental_health_portfolio/` 폴더 내 에셋(CSS, JS, 이미지, 폰트) 관리 및 경로 조정.
*   변환된 페이지의 기능 및 시각적 일관성 검증.
*   프로젝트 문서화 (`project_overview.md`, `current_state.md`, `development_log.md`, `technical_notes.md`).

## Project Status (As of 2026-02-24)
*   **완료된 사항**: 프로젝트의 최종 목표인 `index.html`의 최적화된 포트폴리오 구축이 완료되었습니다. 
    *   **CSS/JS 번들링 및 최적화**: 모든 에셋을 번들링하여 로딩 성능을 극대화했으며, 파이썬 스크립트를 통해 파일 정규화 및 경로 변환을 완벽히 마쳤습니다.
    *   **로고 및 UI 수정**: 모바일 GNB 로고 여백 문제를 해결하고, 시각적 일관성을 확보했습니다.
    *   **단일 페이지 최적화**: 모든 서브페이지 링크를 정리하고, 사용되지 않는 수백 개의 자산을 격리하여 인덱스 페이지 단독으로 완벽하고 가볍게 구동되는 상태를 구현했습니다.

## 결과물 요약
1.  **최적화된 번들 에셋**: `fonts.bundle.css`, `vendor.bundle.css`, `app.bundle.css`, `vendor.bundle.js`, `main.bundle.js` 사용.
2.  **경량화된 자산 구조**: 필수 자산만 남기고 미사용 자산은 `unused_assets/` 폴더로 격리.
3.  **동작 무결성**: 모든 절대 경로의 상대 경로화 및 정적인 링크 처리를 통해 포트폴리오로서의 완성도 확보.
