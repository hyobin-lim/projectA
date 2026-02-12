## 2026-02-11 11:40:00 (파일 정리 완료)
- 불필요한 파일들을 삭제함.
- `mental_health_portfolio/js/jquery-migrate-3.0.0.js` 파일 삭제 완료.
- 루트 폴더 내의 파이썬 스크립트 파일 (`read_css_and_find_rule.py`, `read_css_file.py`, `temp_read_file.py`) 삭제 완료.
- 다음 지시를 기다리는 중.

## 2026-02-12 12:10:00 (모바일 GNB 로고 여백 문제 해결 시도 및 복구)
- `cmpn_logo.png` 모바일 GNB 로고 여백 문제를 해결하기 위해 `portal_contents.css` 파일의 `@media screen and (max-width:960px)` 미디어 쿼리 내에서 `cmpn_logo.png` 이미지, 이를 감싸는 `a` 태그, 그리고 `li.th1` 태그에 대한 CSS 속성을 4단계에 걸쳐 수정했습니다.
    1.  `img[src*="cmpn_logo.png"]`: `margin-bottom: 0 !important;`, `vertical-align: middle !important;` 추가.
    2.  `a[href="/portal/content/campaign/campaignList.do"]`: `display: block !important;`, `line-height: 0 !important;` 추가.
    3.  `li.th1`: `line-height: 1 !important;`, `font-size: 0 !important;` 추가.
    4.  `img[src*="cmpn_logo.png"]`: `display: block !important;` 추가.
- 하지만 사용자 확인 결과, 여백 문제는 CSS 문제가 아닌 **이미지 자체의 여백** 때문으로 확인되었습니다. 사용자가 직접 이미지 파일을 수정하여 문제가 해결되었습니다.
- 이에 따라 `portal_contents.css` 파일에 적용했던 모든 `cmpn_logo.png` 관련 CSS 수정사항을 초기 상태로 **원상 복구**했습니다.
- **복구된 `portal_contents.css` `@media screen and (max-width:960px)` 미디어 쿼리 블록:**
```css
@media screen and (max-width:960px) {
  /* 모바일 GNB 내부 로고 이미지 크기 크기 조정 */
  .gnb_nav #gnb ul li.th1 a img[src*="cmpn_logo.png"] {
    width: 85px !important; /* 너비를 85px로 강제 */
    height: auto !important; /* 종횡비 유지 */
    max-width: 100% !important; /* 모바일에서 이미지가 컨테이너 너비를 초과하지 않도록 보장 */
    margin-bottom: 4px !important;
  }
}
```
- 이번 경험을 통해 이미지 관련 문제 발생 시 CSS 속성 확인 외에 **이미지 파일 자체의 특성(투명 여백 등)**도 면밀히 검토해야 함을 깨달았습니다.

## 2026-02-12 12:20:00 (GNB 메인 메뉴 클릭 시 알림창 문제 해결)
- 데스크톱 및 모바일 GNB 메인 메뉴 (`마주해요`, `자가검진`, `정신건강정보`, `인식개선정보`, `정신건강관련기관`, `정신건강통계`, `소개/알림`) 클릭 시 "포트폴리오에서 지원하지 않는다는 멘트" 알림창이 뜨는 문제를 해결했습니다.
- **`index.html`의 GNB 메인 메뉴 `<a>` 태그 `href` 속성 수정:**
    - `nav#gnb`와 `div.all_menu_area` 내의 각 7개 메인 메뉴 `<a>` 태그의 `href` 속성값을 `javascript:void(0);`로 변경하여 클릭 시 페이지 이동을 방지했습니다. (총 14개 수정)
- **`index.html` 내 JavaScript `moveMenu` 함수 오버라이드:**
    - `index.html` 파일의 `</body>` 태그 직전에 새로운 `<script>` 블록을 삽입하여 기존 `moveMenu` 함수를 오버라이드했습니다.
    - 오버라이드된 `moveMenu` 함수는 기존 함수 내부에 있던 "이 기능은 포트폴리오 버전에서 지원되지 않습니다." 알림창 호출 로직을 제거하고, 대신 콘솔 로그를 출력하도록 수정했습니다.
    - 외부 도메인 링크에 대해서는 `confirm` 메시지 후 새 창으로 이동하도록 기존 동작을 유지했습니다.
    - **오버라이드된 `moveMenu` 함수 스크립트:**
```html
<script>
$(document).ready(function() {
  if (typeof moveMenu !== 'undefined') {
    const originalMoveMenu = moveMenu;
    moveMenu = function (url, id) {
      if (typeof id != "undefined" && id != null && id != "") {
        // AJAX 호출 부분은 포트폴리오 환경에서 작동하지 않으므로 주석 처리
      }
      if (url) {
          const mentalHealthDomain = 'www.mentalhealth.go.kr';
          const isMentalHealthInternalOrPortal = (url.startsWith('https://' + mentalHealthDomain) || url.startsWith('http://' + mentalHealthDomain) || url.startsWith('/portal/'));
          const isExternalDomain = url.startsWith('http://') || url.startsWith('https://');
          if (isExternalDomain) {
              try {
                  const targetHostname = new URL(url).hostname;
                  if (targetHostname.includes(mentalHealthDomain)) {
                      console.log("포트폴리오 버전에서 지원되지 않는 내부 도메인 링크 클릭 시도:", url);
                  } else {
                      if (confirm("이 링크는 외부 사이트(" + url + ")로 연결됩니다. 계속하시겠습니까?")) {
                          window.open(url, '_blank');
                      }
                  }
              } catch (e) {
                  console.error("URL 파싱 오류:", e);
              }
          } else if (isMentalHealthInternalOrPortal) {
            console.log("포트폴리오 버전에서 지원되지 않는 내부 경로 링크 클릭 시도:", url);
          } else {
              window.location.href = url;
          }
      }
    };
  }
});
</script>
```
- 이로써 GNB 메인 메뉴 클릭 시 불필요한 알림창이 더 이상 뜨지 않으며, 포트폴리오 환경에서 적절한 링크 동작을 수행합니다.
