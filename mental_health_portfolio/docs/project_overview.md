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

## Project Status (As of 2026-02-11)
*   **완료된 사항**: 프로젝트의 핵심 목표인 `index.html`의 기능적, 시각적 재구축이 완료되었습니다. CSS 파일의 보이지 않는 손상으로 인해 발생했던 심각한 렌더링 문제 및 404 리소스 로딩 오류들도 대부분 수정되었습니다.
*   **현재 당면 과제**:
    *   **CSS/JS 에셋 번들링 문제**: 성능 최적화를 위한 CSS/JS 에셋 번들링을 시도했으나 오류가 발생하여 현재는 개별 파일들을 `index.html`에 링크한 상태입니다. 이 번들링 문제를 해결하고 재적용해야 합니다.
    *   **`cmpn_logo.png` 모바일 GNB 로고 여백 문제**: 모바일 화면에서 GNB 내 로고 이미지의 크기 자체는 조정되었으나, 위아래로 불필요한 여백이 발생하여 시각적 일관성이 깨지는 문제가 남아있습니다. 이 여백을 제거하여 GNB 내 로고의 배치를 최적화해야 합니다.
