# 프로젝트 파일 및 폴더의 현재 상태 (2026-02-24 16:10 기준)

이 문서는 사용자 지시 및 최근 작업을 바탕으로 프로젝트 내 주요 파일과 폴더의 최신 상태를 설명합니다.

## 1. 루트 디렉토리 (`D:\PROJECT-ALL\projectA\`)

### `index.html` (루트)
*   **목적**: 프로젝트의 최종 결과물인 포트폴리오 메인 페이지입니다.
*   **최신 상태**: 번들링된 에셋(`fonts.bundle.css`, `vendor.bundle.css`, `app.bundle.css`, `vendor.bundle.js`, `main.bundle.js`)을 참조하도록 최적화되었습니다. 모든 서브페이지 링크는 `javascript:void(0);`로 처리되어 인덱스 페이지 단독으로 완벽하게 구동됩니다.

## 2. `mental_health_portfolio/` 디렉토리

### `mental_health_portfolio/css/`
*   **현재 상태**: 최적화된 번들 파일을 사용합니다.
    *   `fonts.bundle.css`: 모든 `@font-face` 선언을 포함하는 폰트 전용 번들.
    *   `vendor.bundle.css`: 라이브러리용 스타일 번들.
    *   `app.bundle.css`: 메인 서비스 스타일 번들. 중복된 `@font-face`를 제거하여 최적화됨.
    *   `old/`: 기존 개별 CSS 파일들은 유지보수를 위해 이 폴더로 이동되었습니다.

### `mental_health_portfolio/js/`
*   **현재 상태**: 정규화된 번들 파일을 사용합니다.
    *   `vendor.bundle.js`: jQuery 및 외부 라이브러리 번들. `<script>` 태그가 제거되고 순수 JS로 정규화됨.
    *   `main.bundle.js`: 서비스 로직 번들.
    *   `old/`: 기존 개별 JS 파일들은 이 폴더로 이동되었습니다.

### `mental_health_portfolio/images/`
*   **현재 상태**: 
    *   `extracted/`: 실제 페이지에서 사용되는 추출된 이미지들을 포함합니다. CSS 내의 경로는 모두 이 폴더를 참조하도록 변환되었습니다.
    *   `unused_assets/`: `audit_assets.py` 스크립트를 통해 분석된, 현재 인덱스 페이지에서 참조되지 않는 자산들이 격리되어 있습니다.

### `mental_health_portfolio/fonts/`
*   **현재 상태**: 페이지 구동에 필요한 폰트 자산들이 유지되고 있으며, `fonts.bundle.css`를 통해 참조됩니다.

## 3. 해결된 과제 및 최적화 내역

### 번들링 및 경로 정규화 (완료)
*   사용자 수동 번들링 후, 에이전트의 파이썬 스크립트를 통해 `<script>` 태그 제거, 중복 `@charset` 정리, 절대 경로 -> 상대 경로 변환을 완료했습니다.

### `cmpn_logo.png` 모바일 GNB 로고 여백 문제 (완료)
*   사용자께서 직접 이미지 파일을 수정하여 여백 문제를 해결했습니다. 관련 CSS는 초기 상태로 안전하게 복구되었습니다.

### 인덱스 페이지 단독 구동 및 경량화 (완료)
*   서브페이지 링크 정리 및 미사용 자산(599개 파일)을 `unused_assets` 폴더로 이동시켜 프로젝트 구조를 극도로 경량화했습니다.
