# 기술 노트: 경로 변환 전략 및 협업 워크플로우

## 목적
이 문서는 `mental_health_portfolio/index-1.html`에서 발견되는 절대 URL을 `mental_health_portfolio/` 디렉토리 내의 로컬 자산을 올바르게 가리키는 상대 경로로 성공적으로 변환한 규칙을 정의합니다. 또한 이러한 자산 로컬화를 위한 협업 워크플로우와 이미지, 폰트, JavaScript에 대한 특정 전략이 성공적으로 적용되었음을 설명합니다.

## 자산 로컬화를 위한 협업 워크플로우 (완료)
직접적인 파일 조작의 제약(API 할당, 시간)으로 인해 자산 로컬화(CSS, JavaScript, 이미지, 폰트 파일 다운로드 및 저장)는 협업 프로세스로 진행되었으며, 성공적으로 완료되었습니다.
1.  **에이전트 (Gemini CLI) 역할**: `index-1.html`에서 로컬화가 필요한 절대 자산 경로를 식별했으며, 원본 **다운로드 URL**과 `mental_health_portfolio/` 디렉토리 내의 권장 **로컬 대상 경로**(파일 이름 포함)를 제공했습니다.
2.  **사용자 역할**: 사용자는 제공된 URL에서 지정된 자산을 수동으로 다운로드하여 지정된 로컬 대상 경로에 저장했습니다. (이 단계는 사용자 동의 및 지시 하에 진행되었습니다.)
3.  **에이전트 (Gemini CLI) 역할 (사용자 작업 후)**: 사용자가 자산 다운로드 및 배치를 확인하면, 에이전트는 `index.html` 파일을 업데이트하여 새로운 로컬 상대 경로를 반영했으며, 이 모든 과정이 성공적으로 완료되었습니다.

    *   **JavaScript 파일에 대한 특별 참고 사항**: 직접 다운로드 시 인코딩 문제가 발생하는 경우(예: 브라우저에서), 에이전트가 JavaScript 파일을 직접 다운로드하여 처리된 파일 또는 내용을 사용자에게 제공하여 배치할 수 있습니다. (이전 단계에서 이 과정은 필요하지 않았습니다.)

## 참조 지점
현재 루트 `index.html`에서 사용되는 상대 경로 구조는 이 변환의 주요 가이드 역할을 했으며, 모든 변환에 일관성 있게 적용되었습니다.

## 일반 변환 규칙 (적용 완료)
`mental_health_portfolio/` 디렉토리 내에서 제공될 로컬 자산에 해당하는 절대 URL의 경우, 기본 URL 부분(`https://www.mentalhealth.go.kr` 또는 루트 상대 경로를 위한 선행 `/`)은 `mental_health_portfolio/` 접두어로 대체되었으며, 이는 성공적으로 적용되었습니다.

### CSS 및 JavaScript에 대한 로컬 폴더 구조 제약 사항 (준수 완료)
경로 관리 및 이해를 단순화하기 위해 로컬화된 CSS(`mental_health_portfolio/css/` 내) 및 JavaScript(`mental_health_portfolio/js/` 내) 파일의 로컬 폴더 구조는 다음 규칙을 준수했습니다.
*   하위 폴더 깊이는 **1단계**로 제한되었습니다.
*   가능한 경우, 파일을 `mental_health_portfolio/css/` 또는 `mental_health_portfolio/js/` 내에 하위 폴더 없이 직접 배치했습니다.

### 경로 변환 예시: (적용 완료)

#### 1. CSS 파일
*   **원본 절대 경로 (`index-1.html`에서):**
    `https://www.mentalhealth.go.kr/css/ncmhp/portal_layout.css`
*   **변환된 상대 경로 (로컬 대상 경로):**
    `mental_health_portfolio/css/ncmhp/portal_layout.css`

#### 2. JavaScript 파일
*   **원본 절대 경로 (`index-1.html`에서):**
    `https://www.mentalhealth.go.kr/js/ncmhp/common/jquery.min.js`
*   **변환된 상대 경로 (로컬 대상 경로):**
    `mental_health_portfolio/js/ncmhp/common/jquery.min.js`

#### 3. 이미지 파일
*   **원본 절대 경로 (`index-1.html`에서):**
    `https://www.mentalhealth.go.kr/images/ncmhp/contents/logo.png`
*   **변환된 상대 경로 (로컬 대상 경로):**
    `mental_health_portfolio/images/ncmhp/contents/logo.png`
    *(참고: 루트 `index.html`의 이미지 경로에 있는 `./` 접두사는 로직에 통합되어 `mental_health_portfolio/` 접두어가 기본 디렉토리를 올바르게 처리하도록 합니다.)*

#### 4. 파비콘 파일
*   **원본 절대 경로 (`index-1.html`에서):**
    `(예시)` `https://www.mentalhealth.go.kr/images/favicon/apple-icon-57x57.png`
*   **변환된 상대 경로 (로컬 대상 경로):**
    `mental_health_portfolio/images/favicon/apple-icon-57x57.png`

## 특정 자산 처리 전략 (적용 완료)

### 이미지 파일
*   **전략**: `index-1.html`의 절대 이미지 경로를 `mental_health_portfolio/images/`에 이미 존재하는 이미지와 비교하여 처리했습니다.
    *   일치하는 이미지(파일 이름 기준)가 로컬에 존재하면, 해당 로컬 이미지를 가리키도록 링크를 업데이트했습니다.
    *   로컬에 없는 이미지에 대해서는 투명 GIF placeholder를 사용하여 시각적 레이아웃을 유지했으며, 이 placeholder들은 사용자가 나중에 실제 이미지로 교체할 수 있습니다.
    *   **모든 주요 placeholder 이미지는 `mental_health_portfolio/images/downloaded/` 폴더에 있는 실제 이미지 파일로 성공적으로 교체되었습니다.**

### 폰트 파일
*   **전략**: `index-1.html`의 절대 경로에 있는 폰트 파일을 사용하지 않고, `mental_health_portfolio/fonts/` 폴더의 로컬 폰트 파일을 활용했습니다.
    *   현재 로컬에 존재하는 폰트 파일은 `.otf` 형식입니다.
    *   폰트 링크는 현재 로컬 `.otf` 파일을 참조하도록 수정하여, 폰트 로딩 오류를 해결했습니다.
    *   **향후 개선점:** 폰트 로딩 효율성 최적화를 위해 `.otf` 파일을 `woff2` 및 `woff` 포맷으로 변환하고, 이를 우선적으로 사용하도록 폰트 로딩 방식을 개선할 수 있습니다.
    *   이 전략은 현재 `.otf` 사용으로 일시 적용되었으며, 최적화는 향후 과제로 남겨두었습니다.

### JavaScript 파일
*   **전략**: 기존 `index.html` (루트)의 JavaScript 관리 방식을 이해하고 따랐습니다. `jquery-migrate-3.0.0.js` 스크립트 제거를 포함하여 JavaScript 파일 관련 최적화 및 관리가 완료되었습니다.

## 최종 처리 결정 (적용 완료)

### `og:url` 메타 태그
*   **결정**: 이 태그는 프로젝트의 실제 배포 URL인 `https://hyobin-lim.github.io/projectA/`를 반영하도록 성공적으로 업데이트되었습니다.

### 동적 이미지 경로
*   **결정**: 초기에는 동적 이미지 경로(예: `/cmm/fms/getImage.do?atchFileId=...`)에 대해 외부 링크를 유지하기로 결정했으며, 이 결정이 적용되었습니다.

### 외부 CDN 링크
*   **결정**: 모든 외부 CDN 리소스(CSS, JS, 폰트 등, **XEIcon 포함**)는 사용자님의 지시에 따라 수동으로 다운로드하여 로컬화되었으며, 에이전트는 원본 다운로드 URL과 권장 로컬 대상 경로를 제공했습니다. 이러한 로컬화된 리소스를 최신 버전으로 업데이트하는 것은 유지보수 역량 과시를 위한 향후 과제로 진행될 수 있습니다.

## 디버깅 및 문제 해결 노트

### CSS 파일의 조용한 파싱 실패 (Silent CSS Parsing Failure)
*   **문제 현상:** 특정 CSS 파일(`portal_layout.css`)이 브라우저 네트워크 탭에서는 정상적으로 로드(HTTP 200 또는 304)되지만, 개발자 도구의 스타일 탭에는 해당 파일의 어떤 규칙도 적용되지 않는 이례적인 상황이 발생했습니다.
*   **진단 과정:**
    1. CSS 규칙의 부재, 오타, 우선순위 문제로 가정하고 `max-width`, `width`, `!important` 등을 순차적으로 적용했으나 실패.
    2. JavaScript에 의한 동적 스타일 변경 가능성을 검토했으나 관련 코드를 찾지 못함.
    3. 최소 기능만 담은 테스트 HTML/CSS 파일을 생성하여 테스트한 결과, 새로운 CSS 파일의 스타일은 정상적으로 적용됨을 확인.
    4. 이를 통해 문제의 원인이 기존 CSS 파일 자체에 있음을 확정.
*   **추정 원인:** 파일 내에 눈에 보이지 않는 특수 문자(BOM 등)가 포함되었거나, 파일 인코딩이 `UTF-8`이 아닌 다른 방식으로 저장되어 브라우저 파서가 파일을 해석하던 중 조용히 실패한 것으로 보입니다.
*   **해결책:** 문제가 된 CSS 파일의 내용을 신뢰할 수 있는 소스(예: 라이브 사이트)의 코드로 완전히 덮어쓰는 방식으로 해결했습니다.
*   **교훈:** CSS가 로드되는데도 전혀 적용되지 않는 문제가 발생할 경우, 코드 내용뿐만 아니라 파일 자체의 인코딩이나 보이지 않는 문자의 존재 가능성을 의심하고, 파일을 새로 생성하거나 깨끗한 내용으로 덮어쓰는 방식이 유효한 해결책이 될 수 있습니다.