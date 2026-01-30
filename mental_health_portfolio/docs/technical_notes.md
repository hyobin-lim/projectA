# 기술 노트: 경로 변환 전략 및 협업 워크플로우

## 목적
이 문서는 `mental_health_portfolio/index-1.html`에서 발견되는 절대 URL을 `mental_health_portfolio/` 디렉토리 내의 로컬 자산을 올바르게 가리키는 상대 경로로 변환하는 규칙을 정의합니다. 또한 이러한 자산 로컬화를 위한 협업 워크플로우와 이미지, 폰트, JavaScript에 대한 특정 전략을 설명합니다.

## 자산 로컬화를 위한 협업 워크플로우
직접적인 파일 조작의 제약(API 할당, 시간)으로 인해 자산 로컬화(CSS, JavaScript, 이미지, 폰트 파일 다운로드 및 저장)는 협업 프로세스로 진행됩니다.
1.  **에이전트 (Gemini CLI) 역할**: `index-1.html`에서 로컬화가 필요한 절대 자산 경로를 식별합니다. 식별된 각 자산에 대해, 에이전트는 원본 **다운로드 URL**과 `mental_health_portfolio/` 디렉토리 내의 권장 **로컬 대상 경로**(파일 이름 포함)를 제공합니다.
2.  **사용자 역할**: 사용자는 제공된 URL에서 지정된 자산을 수동으로 다운로드하여 지정된 로컬 대상 경로에 저장합니다.
3.  **에이전트 (Gemini CLI) 역할 (사용자 작업 후)**: 사용자가 자산 다운로드 및 배치를 확인하면, 에이전트는 `index.html` 파일을 업데이트하여 새로운 로컬 상대 경로를 반영합니다.

    *   **JavaScript 파일에 대한 특별 참고 사항**: 직접 다운로드 시 인코딩 문제가 발생하는 경우(예: 브라우저에서), 에이전트가 JavaScript 파일을 직접 다운로드하여 처리된 파일 또는 내용을 사용자에게 제공하여 배치할 수 있습니다.

## 참조 지점
현재 루트 `index.html`에서 사용되는 상대 경로 구조는 이 변환의 주요 가이드 역할을 합니다. 이는 프로젝트의 확립된 규칙과의 일관성을 보장합니다.

## 일반 변환 규칙
`mental_health_portfolio/` 디렉토리 내에서 제공될 로컬 자산에 해당하는 절대 URL의 경우, 기본 URL 부분(`https://www.mentalhealth.go.kr` 또는 루트 상대 경로를 위한 선행 `/`)은 `mental_health_portfolio/` 접두어로 대체됩니다.

### CSS 및 JavaScript에 대한 로컬 폴더 구조 제약 사항
경로 관리 및 이해를 단순화하기 위해 로컬화된 CSS(`mental_health_portfolio/css/` 내) 및 JavaScript(`mental_health_portfolio/js/` 내) 파일의 로컬 폴더 구조는 다음 규칙을 준수합니다.
*   하위 폴더 깊이는 **1단계**로 제한됩니다. 예를 들어, `mental_health_portfolio/css/component/style.css`는 허용되지만, `mental_health_portfolio/css/component/subcomponent/style.css`는 허용되지 않습니다.
*   가능하다면, 파일을 `mental_health_portfolio/css/` 또는 `mental_health_portfolio/js/` 내에 하위 폴더 없이 직접 배치해야 합니다.

### 경로 변환 예시:

#### 1. CSS 파일
*   **원본 절대 경로 (`index-1.html`에서):**
    `https://www.mentalhealth.go.kr/css/ncmhp/portal_layout.css`
*   **변환된 상대 경로 (로컬 대상 경로 권장):**
    `mental_health_portfolio/css/ncmhp/portal_layout.css`

#### 2. JavaScript 파일
*   **원본 절대 경로 (`index-1.html`에서):**
    `https://www.mentalhealth.go.kr/js/ncmhp/common/jquery.min.js`
*   **변환된 상대 경로 (로컬 대상 경로 권장):**
    `mental_health_portfolio/js/ncmhp/common/jquery.min.js`

#### 3. 이미지 파일
*   **원본 절대 경로 (`index-1.html`에서):**
    `https://www.mentalhealth.go.kr/images/ncmhp/contents/logo.png`
*   **변환된 상대 경로 (로컬 대상 경로 권장):**
    `mental_health_portfolio/images/ncmhp/contents/logo.png`
    *(참고: 루트 `index.html`의 이미지 경로에 있는 `./` 접두사는 로직에 통합되어 `mental_health_portfolio/` 접두어가 기본 디렉토리를 올바르게 처리하도록 합니다.)*

#### 4. 파비콘 파일
*   **원본 절대 경로 (`index-1.html`에서):**
    `(예시)` `https://www.mentalhealth.go.kr/images/favicon/apple-icon-57x57.png`
*   **변환된 상대 경로 (로컬 대상 경로 권장):**
    `mental_health_portfolio/images/favicon/apple-icon-57x57.png`

## 특정 자산 처리 전략 (사용자 논의를 통해)

### 이미지 파일
*   **전략**: `index-1.html`의 절대 이미지 경로를 `mental_health_portfolio/images/`에 이미 존재하는 이미지와 비교합니다.
    *   일치하는 이미지(파일 이름 기준)가 로컬에 존재하면, 해당 로컬 이미지를 가리키도록 링크를 업데이트합니다.
    *   일치하는 이미지가 로컬에 없으면, 사용자에게 해당 이미지를 다운로드하여 적절한 `mental_health_portfolio/images/` 하위 폴더에 배치하도록 지시합니다.

### 폰트 파일
*   **전략**: `index-1.html`의 절대 경로에 있는 폰트 파일을 사용하지 않습니다. 대신 `mental_health_portfolio/fonts/` 폴더(다양한 폰트 계열을 포함)를 활용합니다. 폰트 링크는 이러한 로컬 폰트 파일을 참조하도록 수정됩니다.

### JavaScript 파일
*   **전략**: 기존 `index.html` (루트)는 개별 JS 파일을 생성하고 실행 제어를 위한 별도의 통합 JS 파일을 통해 JavaScript를 관리합니다. 에이전트의 임무는 루트 `index.html`을 분석하여 새로운 JS 파일을 통합할 때 이 확립된 JavaScript 관리 방식을 완전히 이해하고 따르는 것입니다.

## 최종 처리 결정 (사용자 논의를 통해)

### `og:url` 메타 태그
*   **결정**: 이 태그는 프로젝트의 실제 배포 URL인 `https://hyobin-lim.github.io/projectA/`를 반영하도록 업데이트됩니다.

### 동적 이미지 경로
*   **결정**: 초기에는 동적 이미지 경로(예: `/cmm/fms/getImage.do?atchFileId=...`)에 대해 외부 링크를 유지합니다. 이 접근 방식은 특정 이미지에 대한 잠재적인 저작권 또는 법적 고려 사항을 인지하며, 필요시 나중에 별도로 처리할 수 있습니다.

### 외부 CDN 링크
*   **결정**: 모든 외부 CDN 리소스(CSS, JS, 폰트 등, **XEIcon 포함**)는 사용자님께서 수동으로 다운로드하여 로컬화합니다. 에이전트는 원본 다운로드 URL(`index-1.html`에서)과 권장 로컬 대상 경로(CSS/JS에 대한 1단계 하위 폴더 제약 조건 준수)를 제공합니다. 이러한 로컬화된 리소스를 최신 버전으로 업데이트하는 것은 유지보수 역량 과시를 위한 향후 과제로 진행됩니다.