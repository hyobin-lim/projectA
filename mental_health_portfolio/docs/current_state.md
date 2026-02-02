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
*   **현재 상태**: `aos.css`, `jqueryui.css`, `popup.css`, `portal_contents.css`, `portal_layout.css`, `pretendard.css`, `SCoreDream-font-face.css`, `SCoreDream-font-family.css`, `swiper.min.css`, `xeicon.min.css` 등 11개의 CSS 파일이 존재합니다.
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
*   `mental_health_portfolio/css/...
*   `mental_health_portfolio/js/...
*   `mental_health_portfolio/images/...

## 주요 디자인 및 레이아웃 현황 (2026-02-02)

### `main_sec02` 섹션
*   **현재 상태**: 카드(`li`)가 직사각형 형태로 보이며, 이미지와 텍스트(`p`) 사이의 간격으로 인해 텍스트 일부가 가려지거나 가시성이 떨어지는 문제가 있습니다. 사용자 요청에 따라 정사각형 형태로 변경하고 텍스트 가시성을 확보해야 합니다.

### `main_sec04` 섹션
*   **현재 상태**: 카드(`li`)의 테두리가 전체 카드(이미지 및 텍스트 포함)를 감싸고 있습니다. 원본 사이트(`original_site_index.html`)와 같이 테두리가 이미지(`div.icon`)만 감싸도록 수정이 필요합니다.
*   **배경 이미지**: `main_sec04_bg` 이미지가 섹션 전체에 배경으로 적용되지 않고 일부만 감싸는 문제가 있습니다. 섹션 전체에 배경 이미지가 올바르게 표시되도록 수정해야 합니다.

## `2026-02-03` - 완료된 이미지 및 SVG 관련 현황

*   **메인 로고 링크 동작:** 헤더의 메인 로고(`h1 a`) 클릭 시 `common.js`의 전역 링크 처리 로직에 의해 "이 기능은 포트폴리오 버전에서 지원되지 않습니다."라는 알림이 표시되던 문제를 해결했습니다. 이제 로고 클릭 시 메인 페이지로 정상적으로 이동합니다.
*   **메인 로고 이미지 크기:** `.top_area h1` 요소의 크기가 반응형으로 설정되었습니다. 데스크톱 환경에서는 `width:388px`, `height:54px`로, 960px 이하의 화면에서는 `width:223px`, `height:31px`로 자동 조정됩니다.
*   **애니메이션 SVG 처리:**
    *   **검색 바 아이콘 (`line-md--file-search.svg`):** HTML에 SVG를 직접 삽입하고 CSS를 조정했으며, 클릭 시 애니메이션이 동작하도록 JavaScript를 추가했습니다.
    *   **전체 메뉴 닫기 아이콘 (`btn_all_clo.svg`):** HTML에 SVG를 직접 삽입하고 CSS를 조정했으며, 전체 메뉴 창이 열릴 때 애니메이션이 동작하도록 JavaScript를 추가했습니다.
*   **푸터 이미지 연결:** 푸터에 사용된 이미지 (`WA_img_20250814.png`)를 `index.html` 내에서 올바른 경로로 연결했습니다.

## `2026-02-03` - 해결된 문제점 및 최종 정리

*   **`main_sec04` 카드 테두리 반응형 문제 (해결):** 창 크기를 줄일 때 `main_sec04` 카드들의 둥근 테두리(`div.icon`)와 내부 사각형 이미지가 겹쳐 보이는 문제가 해결되었습니다. `.main_sec04 .agency li .icon`에 `overflow: hidden;` 속성을 추가하고, 이미지(`img`) 자체에도 `width: 100%; height: 100%; object-fit: cover;`를 적용하여 문제를 해결했습니다.
*   **콘솔 500 Internal Server Error (해결):** `mental_health_portfolio/images/favicon/` 경로의 파일들(`favicon.ico`, `manifest.json` 등)에 대해 발생하던 500 Internal Server Error가 사용자에 의해 해결되었습니다. 이제 콘솔에 관련 오류가 더 이상 표시되지 않습니다.
*   **사용하지 않는 SVG 파일 정리 (완료):** `line-md--file-search.svg` 및 `btn_all_clo.svg` 파일은 HTML에 직접 삽입되어 더 이상 외부 파일로 참조되지 않으므로, `mental_health_portfolio/images/extracted/` 폴더에서 해당 파일들을 삭제하여 프로젝트를 정리했습니다.
---
## `2026-02-04` 오후 - 최종 상호작용 수정 및 번들링 계획

*   **헤더 로고 링크 (수정):**
    *   **문제점:** 로고 클릭 시 `/portal/main/index.do` 경로로 이동하여 로컬 환경에서 오류가 발생했습니다.
    *   **해결책:** `index.html`에서 로고의 `href`를 `./index.html`로 수정하여 메인 페이지로 올바르게 이동하도록 변경했습니다.

*   **메인 검색창 애니메이션 (재수정):**
    *   **요청사항:** 돋보기는 항상 보이는 상태에서, 클릭 시 폴더 테두리만 그려지도록 수정.
    *   **해결책:**
        1.  `index.html`의 검색 버튼 SVG에서, 돋보기 모양 `<path>`의 `stroke-dashoffset` 속성과 `<animate>` 태그를 제거하여 돋보기가 정적으로 항상 표시되도록 했습니다.
        2.  `common.js`에서 `searchAnim2` 애니메이션을 호출하는 코드를 제거했습니다.

*   **CSS/JS 에셋 번들링 (계획 수립):**
    *   **문제점:** 여러 개의 CSS 및 JS 파일 로드는 페이지 성능을 저하시킵니다.
    *   **계획:** 사용자 요청에 따라, 무조건적인 단일 파일 통합이 아닌, 목적별 그룹(Vendor, Fonts, App)으로 나누어 번들링하는 새로운 계획을 수립했습니다. 이 과정에서 각 파일의 출처를 명확히 하는 주석을 추가하기로 했습니다.
    *   **현재 상태:** CSS 번들링을 시도했으나, 파일 읽기 도구의 불안정성으로 인해 스타일이 깨지는 문제가 발생하여 즉시 원상 복구했습니다. (`vendor.bundle.css` 삭제, `index.html`의 `<link>` 태그 복원)
