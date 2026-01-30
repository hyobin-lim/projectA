# 개발 로그

이 문서는 프로젝트 진행 중 발생한 파일 변경, 개발 진척 상황, 그리고 주요 기술적 통찰에 대한 시간 순서별 업데이트를 기록합니다.

---

2026-01-30 09:00:00:
- `https://www.mentalhealth.go.kr/portal/main/index.do` 사이트에서 소스 경로를 추출하고, 그 중 인덱스 페이지와 관련된 소스만을 모아 `mental_health_portfolio/index-1.html` 문서에 저장하여 프로젝트의 기반을 구축함 (최초 시작 작업).

2026-01-30 11:03:00:
- `mental_health_portfolio/index-1.html`의 절대 경로를 루트 `index.html`의 상대 경로 구조를 기준으로 `mental_health_portfolio/` 접두어를 붙인 새로운 상대 경로로 변환하는 방식을 파악 완료.

2026-01-30 11:33:00:
- `project_overview.md`에 `index.html` 파일의 구체적인 목표(절대 경로를 상대 경로로 변경하여 작업 능력을 보여주는 포트폴리오 구축)를 반영하여 업데이트 완료.

2026-01-30 11:48:00:
- `mental_health_portfolio/index-1.html` 문서의 내용 및 구조 파악 완료.
    - **주요 절대 경로 유형 식별**: CSS, JavaScript, 이미지 파일 (대부분 `https://www.mentalhealth.go.kr/` 도메인 또는 루트 상대 경로 `/` 사용).
    - **외부 CDN 링크**: Google Analytics, Swiper.js, XEIcon, AOS 등 (별도 처리 필요).
    - **동적 이미지 경로**: `/cmm/fms/getImage.do?atchFileId=...` 형태 (로컬화 시 특별 처리 방안 논의 필요).
    - **`og:url` 메타 태그**: 라이브 사이트 URL (처리 방안 논의 필요).
    - **기능적 링크**: `javascript:moveMenu(...)` 등 (현재 유지).
    - **경로 변환 전략**: `technical_notes.md`에 명시된 대로, 루트 `index.html`의 상대 경로 구조를 기준으로 `mental_health_portfolio/` 접두어를 사용하여 변환할 계획 수립.

2026-01-30 11:53:00:
- `mental_health_portfolio/index-1.html`과 루트 `index.html` 문서 비교 작업 시작.

2026-01-30 11:58:00:
- `mental_health_portfolio/index-1.html`과 루트 `index.html` 문서 비교 분석 완료.
    - **`<head>` 섹션:**
        - **루트 `index.html`의 고유 요소**: Google Tag Manager, Cookiebot 스크립트, `images/favicon/...` 상대 경로 파비콘 링크, `css/style.css` 및 `js/script.js` 로컬 파일 참조, 인라인 스타일 유지.
        - **`index-1.html`의 주요 요소**: 상세한 `meta` 태그 (SEO/OG), 다수의 외부 CDN 링크, `https://www.mentalhealth.go.kr/` 기반의 절대 경로 로컬 CSS/JS 파일 참조.
        - **통합 전략**: `index-1.html`의 상세 `meta` 태그는 병합/대체, 외부 CDN은 별도 논의, 로컬 CSS/JS는 경로 변환 후 통합. 루트 `index.html`의 GA/Cookiebot 및 파비콘 링크는 유지.
    - **`<body>` 섹션:**
        - **루트 `index.html`**: 간소화된 플레이스홀더 콘텐츠.
        - **`index-1.html`**: 완전하고 상세한 메인 콘텐츠 (메인 섹션 01, 02, 03, 04), 절대 경로 이미지 및 스크립트 링크, 원본 포털 기능과 연결된 복잡한 인라인 JavaScript 로직(`moveMenu` 함수 등), 다양한 모달 팝업 구조 포함.
        - **통합 전략**: `index-1.html`의 `<body>` 전체 내용으로 루트 `index.html`의 `<body>`를 대체하되, 모든 자산 경로를 변환하고 JavaScript 로직은 포트폴리오 목적에 맞게 수정/제거 필요.

    - **전반적인 결론**: 루트 `index.html`의 최상위 `<head>` 구조 및 포트폴리오 고유 요소는 유지하면서, `index-1.html`의 상세 `meta` 태그와 `<body>` 전체 내용을 가져와 통합하는 방향으로 진행. 이때, `index-1.html`의 모든 로컬 자산 절대 경로는 `mental_health_portfolio/`를 접두어로 하는 상대 경로로 변환. 외부 CDN 및 동적 이미지 경로는 사용자님과 추가 논의 필요.

2026-01-30 12:23:00:
- 작업 구상 시 `index-1.html`을 내용 및 디자인의 주 참고 자료로 사용하고, 기존 루트 `index.html`은 구조 및 스타일 참고 자료로 활용하며, 개선 필요 시 사용자님과 상의 후 반영하기로 협업 지침을 명확히 함.
- 다음 단계로 루트 `index.html` 파일의 JavaScript 관리 방식 분석을 진행하기로 결정함.

2026-01-30 12:33:00:
- 루트 `index.html` JavaScript 관리 방식 분석 결과:
    - `<head>`에 외부 CDN 스크립트(Google Tag Manager, Cookiebot) 직접 포함.
    - `<body>` 끝에 `<script src="js/script.js"></script>` 로컬 스크립트 링크 존재.
    - **`js/script.js` 파일이 로컬에 존재하지 않음 (File not found).**
    - `index.html` 내부에 여러 로컬 JS 파일을 통합 관리하는 명확한 패턴 없음.
    - 결론: 현재 루트 `index.html`에는 복잡한 로컬 JS 관리 방식이 없으므로, `index-1.html`의 JS 통합 시 새로운 JS 관리 방식 정의에 유연성이 있음.

2026-01-30 12:38:00:
- 루트 `index.html` 문서를 `mental_health_portfolio/index-1.html` 기반의 순수 HTML 뼈대로 초기화 완료. (모든 외부 링크 및 스크립트 제거/비활성화).

2026-01-30 12:48:00:
- 프로젝트 배포 URL (`https://hyobin-lim.github.io/projectA/`) 확인 및 `og:url` 메타 태그 업데이트 결정.
- 동적 이미지 경로는 초기에는 외부 링크 유지, 저작권/법적 문제 발생 시 별도 고려.
- 외부 CDN 링크는 `index-1.html`에 명시된 원본 버전으로 사용자님께서 수동 다운로드하여 로컬화. 최신화는 추후 별도 작업으로 진행.

2026-01-30 13:03:00:
- 루트 `index.html`에 포트폴리오 고지 사항 팝업창 생성 완료 (HTML 구조, 인라인 CSS, 인라인 JavaScript 포함).

2026-01-30 13:08:00:
- 포트폴리오 고지 사항 팝업 기능을 별도의 CSS(`mental_health_portfolio/css/popup.css`) 및 JavaScript(`mental_health_portfolio/js/popup.js`) 파일로 분리하여 `index.html`에 링크하는 방식으로 리팩토링 완료.
- `plan_updates.md` 내용 정리 (완료된 작업 항목 제거)

2026-01-30 13:28:00:
- 핵심 스타일 통합(`index.html`에 필요한 CSS 파일 연결) 단계 시작.
- `mental_health_portfolio/index-1.html`에서 다음 CSS 링크들을 식별하고 로컬화 지침을 준비함:
    - **원본 URL:** `https://www.mentalhealth.go.kr/css/ncmhp/jqueryui.css`
        - **로컬 대상 경로:** `mental_health_portfolio/css/jqueryui.css`
    - **원본 URL:** `https://www.mentalhealth.go.kr/css/ncmhp/portal_reset.css`
        - **로컬 대상 경로:** `mental_health_portfolio/css/portal_reset.css`
    - **원본 URL:** `https://www.mentalhealth.go.kr/css/ncmhp/portal_layout.css?v=20250627`
        - **로컬 대상 경로:** `mental_health_portfolio/css/portal_layout.css`
    - **원본 URL:** `https://www.mentalhealth.go.kr/css/ncmhp/portal_contents.css?v=20251206`
        - **로컬 대상 경로:** `mental_health_portfolio/css/portal_contents.css`
    - **원본 URL:** `https://www.mentalhealth.go.kr/css/ncmhp/xeicon.min.css`
        - **로컬 대상 경로:** `mental_health_portfolio/css/xeicon.min.css`
    - **원본 URL:** `https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.4.1/css/swiper.min.css`
        - **로컬 대상 경로:** `mental_health_portfolio/css/swiper.min.css`
    - **원본 URL:** `https://cdn.jsdelivr.net/gh/ungveloper/web-fonts/SCoreDream/font-face.css`
        - **로컬 대상 경로:** `mental_health_portfolio/css/SCoreDream-font-face.css`
    - **원본 URL:** `https://cdn.jsdelivr.net/gh/ungveloper/web-fonts/SCoreDream/font-family.css`
        - **로컬 대상 경로:** `mental_health_portfolio/css/SCoreDream-font-family.css`
    - **원본 URL:** `https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css`
        - **로컬 대상 경로:** `mental_health_portfolio/css/pretendard.css`
    - **원본 URL:** `https://unpkg.com/aos@2.3.1/dist/aos.css`
        - **로컬 대상 경로:** `mental_health_portfolio/css/aos.css`

2026-01-30 13:33:00:
- `xeicon` 폴더 구조 및 폰트 관련 CSS 파일 위치에 대한 논의 진행.
- `xeicon.min.css`는 `mental_health_portfolio/css/`에 직접 배치하고, `xeicon` 관련 폰트 파일들은 `mental_health_portfolio/fonts/` 폴더 내 하위 폴더에 배치하기로 결정.
- 폰트 관련 CSS 파일들(예: `SCoreDream-font-face.css` 등)은 `mental_health_portfolio/css/` 폴더에 두는 것이 적절하다는 의견 공유.
- 사용자님께 폰트 관련 CSS 파일들의 최종 위치 결정 요청.

2026-01-30 13:38:00:
- CSS 다운로드 지침 목록 최종 확정 및 사용자에게 제공 완료. (폰트 관련 CSS는 `mental_health_portfolio/css/`에 배치, `xeicon` 폰트 파일은 `mental_health_portfolio/fonts/` 내 하위 폴더에 배치)
- 재확정된 CSS 다운로드 목록에 대한 사용자님의 승인 기다리는 중.

2026-01-30 13:43:00:
- 사용자님께서 모든 CSS 문서의 다운로드 및 배치를 완료하셨음을 확인하고, 폰트 파일들도 `fonts` 폴더에 존재함을 알려주심 (SD Dream 폰트 등).
- CSS 파일 내부 경로 및 폰트 파일의 실제 경로를 꼼꼼히 살펴보고 업데이트할 필요성을 인지.
- CSS 파일에 링크 연결 및 다운로드된 CSS 파일 내부에 있는 경로 조정 필요성 인지.

2026-01-30 13:48:00:
- `mental_health_portfolio/css/xeicon` 폴더 내용 확인 중 `EPERM: operation not permitted` 권한 오류 발생. 사용자님께 해당 폴더의 권한 확인 및 접근 권한 부여 요청.

2026-01-30 13:53:00:
- 사용자님께서 `css` 폴더 안의 `xeicon` 폴더는 삭제할 예정이므로 신경 쓰지 않아도 된다고 확인해주심. 이로써 `xeicon` 관련 권한 오류 문제는 해결됨.

2026-01-30 13:58:00:
- `index.html`에 다운로드된 모든 CSS 파일 링크 완료. (새로운 링크들은 `index.html`의 `<head>` 섹션에 팝업 CSS 링크 뒤, 메타 태그 앞에 `index-1.html`의 상대적 순서를 유지하며 배치됨).

2026-01-30 14:03:00:
- `jqueryui.css` 내부 이미지 경로 수정 완료. (`/images/ncmhp/cmm/ui-icons_...` -> `../images/downloaded/ui-icons_...`)

2026-01-30 14:08:00:
- `portal_reset.css` 내부 폰트 경로 수정 완료. (`font/NotoSans-...` -> `../fonts/Noto_Sans_KR/NotoSans-...`)

2026-01-30 14:13:00:
- `portal_layout.css` 분석 중, 내부 이미지 경로(`url("/images/ncmhp/contents/...")`, `url("/images/ncmhp/cmm/...")`)와 로컬 이미지 파일 구조(`mental_health_portfolio/images/extracted/`에 평탄화된 이미지들) 간의 불일치 발견.
- 사용자님께서 이 이미지 경로 불일치를 어떻게 처리할지에 대한 결정 요청 (옵션 A: CSS 경로에 맞춰 이미지 폴더 구조 재구성 또는 옵션 B: CSS 경로를 이미지 폴더 구조에 맞춰 평탄화).
- `xeicon.min.css`가 `css` 폴더 안에 바로 위치함을 사용자님께서 확인해주셨습니다.
- `index-1.html`의 "기초 뼈대 CSS와 JS"가 구체적으로 어떤 부분을 지칭하는지 사용자님께 재차 문의.