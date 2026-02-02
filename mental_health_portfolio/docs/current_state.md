# 프로젝트 파일 및 폴더의 현재 상태

이 문서는 사용자 지시 및 최근 분석을 바탕으로 프로젝트 내 주요 파일과 폴더의 초기 상태 및 목적을 설명합니다.

## 1. 루트 디렉토리 (`D:\PROJECT-ALL\projectA\`)

### `index.html` (루트)
*   **목적**: 프로젝트의 주요 대상 파일입니다. 현재 Google Tag Manager, Cookiebot 스크립트, favicon 링크, 사용자 정의 팝업 섹션을 포함한 기본적인 HTML 구조를 가지고 있습니다.
*   **콘텐츠 출처**: 이전 사건 후 "복구된" 상태를 나타내며, 그 상대 경로 구조(예: `images/favicon/`, `css/style.css`, `js/script.js`)는 원하는 상대 경로 규칙에 대한 중요한 참고 자료입니다.

## 2. `mental_health_portfolio/` 디렉토리

### `mental_health_portfolio/index-1.html`
*   **목적**: 포트폴리오 페이지를 위한 HTML 콘텐츠의 주요 소스입니다.
*   **콘텐츠 출처**: `https://www.mentalhealth.go.kr/portal/main/index.do`에서 직접 가져왔습니다.
*   **주요 특징**: CSS, JavaScript, 이미지 및 기타 자산에 대한 수많은 **절대 경로**를 포함하고 있으며, 이들을 상대 경로로 변환해야 합니다.

### `mental_health_portfolio/bacup.html`
*   **목적**: `mental_health_portfolio/index-1.html`의 백업 역할을 합니다. 이전에는 `index-1.html`의 내용으로 오인되었지만, 유사한 완전한 HTML을 포함하고 있습니다.

### `mental_health_portfolio/docs/`
*   **목적**: 프로젝트 문서화를 위한 전용 폴더입니다.
    *   `plan_updates.md`: 진행 상황, 계획 변경 및 결정을 추적합니다. (자동 업데이트)
    *   `project_overview.md`: 고수준 프로젝트 설명 및 목표. (새로 생성됨)
    *   `current_state.md`: 이 문서로, 초기 상태를 상세히 설명합니다.
    *   `development_log.md`: 의사 결정 및 작업의 시간 순서 로그를 기록하는 데 사용됩니다. (제안됨)
    *   `technical_notes.md`: 경로 변환 규칙과 같은 특정 기술 지침. (제안됨)

### `mental_health_portfolio/css/`
*   **목적**: 프로젝트에 필요한 CSS 스타일시트를 저장하기 위한 것입니다.
*   **현재 상태**: `aos.css`, `jqueryui.css`, `popup.css`, `portal_contents.css`, `portal_layout.css`, `portal_reset.css`, `pretendard.css`, `SCoreDream-font-face.css`, `SCoreDream-font-family.css`, `swiper.min.css`, `xeicon.min.css` 등 11개의 CSS 파일이 존재합니다.
    *   **최근 업데이트 (2026-02-01):**
        *   `portal_layout.css` 파일이 보이지 않는 손상으로 인해 스타일이 적용되지 않는 문제가 발생했습니다. 사용자가 라이브 사이트의 CSS 코드를 직접 덮어쓰는 방식으로 문제를 해결했습니다.
        *   이로 인해 발생한 배경 이미지 404 오류를 해결하기 위해, `portal_layout.css` 내의 `url()` 경로들을 로컬 프로젝트에 맞게 수정했습니다.
        *   `SCoreDream-font-face.css` 파일의 잘못된 폰트(`SCDream6`) 경로를 로컬 `.otf` 파일을 바라보도록 수정하여 폰트 로딩 404 오류를 해결했습니다.

### `mental_health_portfolio/js/`
*   **목적**: 프로젝트에 필요한 JavaScript 파일을 저장하기 위한 것입니다.
*   **현재 상태**: `aos.js`, `common.js`, `jquery-ui.min.js`, `jquery.min.js`, `main.js`, `popup.js`, `portal_contents.js`, `slick.min.js`, `swiper.min.js` 등 9개의 JavaScript 파일이 존재합니다. jQuery Migrate 스크립트(`jquery-migrate-3.0.0.js`)는 제거되었으며, 모든 주요 스크립트 로직은 로컬 및 상대 경로를 사용합니다.

### `mental_health_portfolio/images/`
*   **목적**: 이미지 자산을 저장하기 위한 것입니다.
    *   `extracted/`: `index-1.html`의 절대 경로에서 부분적으로 추출된 이미지(예: `cmpn_logo.png`, `main_sec02_icon01.png` 등) 및 안내 텍스트 파일을 포함합니다.
    *   `downloaded/`: 다양한 이미지 파일(예: 로고, 아이콘, 보고서 표지) 16개가 존재합니다. `index.html`의 모든 `<img>` 태그의 `src` 속성은 로컬 이미지 파일 또는 투명 GIF 데이터 URI로 정상적으로 연결되었습니다.
    *   `favicon/`: 다양한 파비콘 파일(`apple-icon-*.png`, `favicon-*.png`, `manifest.json`, `browserconfig.xml` 등)을 포함합니다.

### `mental_health_portfolio/fonts/`
*   **목적**: 사용자 정의 폰트 파일을 저장하기 위한 것입니다.
*   **현재 상태**: 여러 폰트 계열(`에이투지체`, `AstaSans`, `nanum` 등)의 하위 디렉토리를 포함합니다.

## 루트 `index.html`의 핵심 경로 참조
현재 `index.html` (루트)는 모든 자산을 `mental_health_portfolio/`를 기준으로 하는 상대 경로로 참조하고 있으며, 다음과 같은 구조를 가집니다:
*   `mental_health_portfolio/images/favicon/...`
*   `mental_health_portfolio/css/...`
*   `mental_health_portfolio/js/...`
*   `mental_health_portfolio/images/...`