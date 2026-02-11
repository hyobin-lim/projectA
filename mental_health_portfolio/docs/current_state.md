# 프로젝트 파일 및 폴더의 현재 상태

이 문서는 사용자 지시 및 최근 분석을 바탕으로 프로젝트 내 주요 파일과 폴더의 초기 상태 및 목적, 그리고 현재 당면한 과제를 설명합니다.

## 1. 루트 디렉토리 (`D:\PROJECT-ALL\projectA\`)

### `index.html` (루트)
*   **목적**: 프로젝트의 주요 대상 파일입니다. 현재 Google Tag Manager, Cookiebot 스크립트, favicon 링크, 사용자 정의 팝업 섹션을 포함한 기본적인 HTML 구조를 가지고 있습니다.
*   **콘텐츠 출처**: 이전 사건 후 "복구된" 상태를 나타내며, 그 상대 경로 구조(예: `images/favicon/`, `css/style.css`, `js/script.js`)는 원하는 상대 경로 규칙에 대한 중요한 참고 자료입니다.

## 2. `mental_health_portfolio/` 디렉토리

### `mental_health_portfolio/index-1.html`
*   **목적**: 포트폴리오 페이지를 위한 HTML 콘텐츠의 주요 소스입니다.
*   **콘텐츠 출처**: `https://www.mentalhealth.go.kr/portal/main/index.do`에서 직접 가져왔습니다.

### `mental_health_portfolio/bacup.html`
*   **목적**: `mental_health_portfolio/index-1.html`의 백업 역할을 합니다. 이전에는 `index-1.html`의 내용으로 오인되었지만, 유사한 완전한 HTML을 포함하고 있습니다.

### `mental_health_portfolio/docs/`
*   **목적**: 프로젝트 문서화를 위한 전용 폴더입니다.
    *   `plan_updates.md`: 진행 상황, 계획 변경 및 결정을 추적합니다.
    *   `project_overview.md`: 고수준 프로젝트 설명 및 목표.
    *   `current_state.md`: 이 문서로, 현재 상태를 상세히 설명합니다.
    *   `development_log.md`: 의사 결정 및 작업의 시간 순서 로그를 기록합니다.
    *   `technical_notes.md`: 경로 변환 규칙과 같은 특정 기술 지침 및 문제 해결 노트를 기록합니다.

### `mental_health_portfolio/css/`
*   **목적**: 프로젝트에 필요한 CSS 스타일시트를 저장하기 위한 것입니다.
*   **현재 상태**: `aos.css`, `jqueryui.css`, `popup.css`, `portal_contents.css`, `portal_layout.css`, `pretendard.css`, `SCoreDream-font-face.css`, `SCoreDream-font-family.css`, `swiper.min.css`, `xeicon.min.css` 등 다수의 CSS 파일이 존재합니다.
    *   **최근 현황 (2026-02-11):** CSS 번들링을 시도했으나 오류가 발생하여 현재는 `app.bundle.css`와 `vendor.bundle.css`를 사용하지 않고 기존의 개별 CSS 파일들을 다시 `index.html`에 링크한 상태입니다.

### `mental_health_portfolio/js/`
*   **목적**: 프로젝트에 필요한 JavaScript 파일을 저장하기 위한 것입니다.
*   **현재 상태**: `aos.js`, `common.js`, `jquery-migrate-3.0.0.js`, `jquery-ui.min.js`, `jquery.min.js`, `main.js`, `popup.js`, `portal_contents.js`, `slick.min.js`, `swiper.min.js` 등 다수의 JavaScript 파일이 존재합니다.
    *   **최근 현황 (2026-02-11):** JavaScript 번들링을 시도했으나 오류가 발생하여 현재는 기존의 개별 JavaScript 파일들을 다시 `index.html`에 링크한 상태입니다.

### `mental_health_portfolio/images/`
*   **목적**: 이미지 자산을 저장하기 위한 것입니다.
    *   `extracted/`: `index-1.html`의 절대 경로에서 부분적으로 추출된 이미지 및 안내 텍스트 파일을 포함합니다.
    *   `downloaded/`: 다양한 이미지 파일이 존재합니다. `index.html`의 모든 `<img>` 태그의 `src` 속성은 로컬 이미지 파일 또는 투명 GIF 데이터 URI로 정상적으로 연결되었습니다.
    *   `favicon/`: 다양한 파비콘 파일을 포함합니다.

### `mental_health_portfolio/fonts/`
*   **목적**: 사용자 정의 폰트 파일을 저장하기 위한 것입니다.
*   **현재 상태**: 여러 폰트 계열의 하위 디렉토리를 포함합니다.

## 루트 `index.html`의 핵심 경로 참조
현재 `index.html` (루트)는 모든 자산을 `mental_health_portfolio/`를 기준으로 하는 상대 경로로 참조하고 있으며, 다음과 같은 구조를 가집니다:
*   `mental_health_portfolio/images/favicon/...`
*   `mental_health_portfolio/css/...`
*   `mental_health_portfolio/js/...`
*   `mental_health_portfolio/images/...`

## 현재 당면 과제 (2026-02-11)

### `cmpn_logo.png` 모바일 GNB 로고 여백 문제
*   **문제 현상**: 모바일 화면에서 GNB (Global Navigation Bar) 내 `cmpn_logo.png` 로고 이미지의 크기를 조절하기 위해 `portal_contents.css`에 `@media screen and (max-width:960px)` 미디어 쿼리를 적용했습니다. 이 미디어 쿼리는 로고 이미지의 `width`, `height`, `max-width`, `margin-bottom` 속성을 조정하여 이미지 자체의 크기 문제는 해결했습니다.
*   **현재 문제**: 하지만 이 CSS 적용 후 GNB 창 안에서 로고 이미지의 위아래로 불필요한 여백이 발생하여, 다른 GNB 섹션들과 시각적인 일관성이 깨지는 문제가 남아있습니다. 이 여백을 제거하여 GNB 내 로고의 배치를 최적화해야 합니다.
