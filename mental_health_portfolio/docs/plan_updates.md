# 프로젝트 계획 업데이트 (Plan Updates)

## 2026-02-11 11:00:00
- **계획**: CSS 및 JavaScript 에셋 번들링을 시도했으나, 파일 읽기 도구의 불안정성 등으로 오류가 발생하여 번들링 된 파일 사용을 중단하고 `index.html`에서 기존의 개별 CSS 및 JavaScript 파일들을 다시 링크하여 원상 복구함.
- **상태**: 번들링 실패 및 원상 복구 완료. 현재 개별 파일 링크 유지.
- **세부사항**: 번들링 재시도 계획은 `technical_notes.md`에 기록된 문제점 해결 이후로 연기됨.

## 2026-02-11 11:30:00
- **계획**: `cmpn_logo.png` 모바일 GNB 로고 이미지의 여백 문제 해결. `portal_contents.css`에 추가된 미디어 쿼리(`@media screen and (max-width:960px)`)로 로고 이미지 자체의 크기 문제는 해결되었으나, GNB 내에서 이미지 위아래로 불필요한 여백이 발생하고 있음.
- **상태**: 진행 중.
- **세부사항**: GNB 레이아웃에 영향을 주지 않으면서 로고 이미지 주변의 여백을 제거하고 다른 섹션들과 시각적 일관성을 확보하는 새로운 CSS 규칙을 분석 및 적용할 예정.

## 2026-02-12 12:10:00
- **계획**: `cmpn_logo.png` 모바일 GNB 로고 이미지의 여백 문제 해결을 위해 `portal_contents.css`에 적용했던 모든 CSS 수정사항을 원상 복구함. 문제의 원인이 이미지 자체의 여백 때문으로 확인되었으며, 사용자가 직접 이미지를 수정하여 해결함.
- **상태**: 복구 완료.
- **세부사항**: `portal_contents.css`의 `@media screen and (max-width:960px)` 미디어 쿼리 내의 `cmpn_logo.png` 관련 모든 CSS 규칙이 초기 상태로 되돌려짐. 상세 내용은 `development_log.md` 참조.

## 2026-02-24 11:30:00
- **계획**: 파이썬 스크립트를 사용하여 번들링된 CSS 및 JavaScript 파일들을 최적화 및 수정.
- **상태**: 완료.
- **세부사항**:
    - `read_file` 도구의 용량 제한 문제를 해결하기 위해 파이썬 스크립트를 사용하여 직접 파일들을 처리함.
    - JavaScript 파일들(`main.bundle.js`, `vendor.bundle.js`)에서 잘못 포함된 `<script>` 태그들을 제거함.
    - CSS 파일들(`app.bundle.css`, `vendor.bundle.css`)의 `@charset` 선언을 최상단에 하나만 유지하도록 정리함.
    - `app.bundle.css` 내에 남아있던 절대 경로(`/images/ncmhp/contents/`)를 로컬 상대 경로(`../images/extracted/`)로 일괄 변환함.
    - CSS 내의 이미지/폰트 경로 유효성을 검사하여 누락된 자산 리스트를 도출함.
- **다음 단계**: 사용자에게 누락된 자산(이미지) 다운로드 및 배치를 요청하고, 완료 후 최종 확인.

## 2026-02-24 14:26:12
- **계획**: CSS 및 JavaScript 번들링 적용 및 파일 정규화(Script 태그 제거 등) 완료.
- **상태**: 완료.
- **세부사항**: 사용자가 직접 라이브러리 순서를 조정하여 jQuery 의존성 문제를 해결함. 번들링된 에셋(vendor.bundle.css, app.bundle.css, vendor.bundle.js, main.bundle.js)이 index.html에 정상 적용됨. CSS 내 절대 경로를 포트폴리오 구조에 맞는 상대 경로로 변환 완료.

## 2026-02-24 15:15:00
- **계획**: `app.bundle.css`에서 폰트 관련 설정을 `fonts.bundle.css`로 분리하고, 중복 및 불필요한 코드를 정리하여 최적화.
- **상태**: 완료.
- **세부사항**: 
    - 파이썬 스크립트(`optimize_css_bundles.py`)를 사용하여 `app.bundle.css`와 `fonts.bundle.css`의 중복 `@charset` 선언을 정리함.
    - `app.bundle.css` 내의 `@font-face` 블록을 모두 제거하여 `fonts.bundle.css`와 역할을 분리하고 파일 크기를 줄임.
    - `index.html`에 `fonts.bundle.css` 연결을 추가함.

## 2026-02-24 16:10:00
- **계획**: 인덱스 페이지만의 완벽한 구동을 위한 링크 정리 및 미사용 자산 격리.
- **상태**: 완료.
- **세부사항**: 
    - `index.html` 내의 모든 서브페이지 링크(`/portal/...`)를 `javascript:void(0);`로 일괄 변경하여 포트폴리오 목적에 맞게 조정함.
    - 자산 사용 현황을 전수 조사하여, 인덱스 페이지에서 사용되지 않는 599개의 이미지/폰트 파일을 `unused_assets` 폴더로 격리함.
    - 이로써 인덱스 페이지 로딩에 필요한 필수 자산만 남겨 프로젝트 구조를 경량화함.

