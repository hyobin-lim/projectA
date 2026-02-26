/* Portfolio Extracted Scripts */
(function(){
// 데이터 레이어를 초기화합니다. Google Tag Manager에서 사용됩니다.
      window.dataLayer = window.dataLayer || [];
      // gtag 함수를 정의하여 데이터 레이어에 이벤트를 푸시합니다.
      function gtag() {
        dataLayer.push(arguments);
      }
      // 현재 시간을 기준으로 gtag를 초기화합니다.
      gtag("js", new Date());

      // 구글 애널리틱스 추적 ID(UA-172724630-1)를 설정합니다.
      gtag("config", "UA-172724630-1");
})();

(function(){
// 문서가 완전히 로드된 후 스크립트를 실행합니다.
          $(document).ready(function () {
            // 회원 서비스 사용 여부 확인 및 페이지 이동 함수
            // '국가정신건강서비스포털 고도화('22)' 프로젝트에서 회원 서비스 중지 요구사항에 따라 재정의된 함수로 보입니다.
            moveCheckLoginMenu = function (url) {
              moveMenu(url); // 로그인 확인 없이 바로 moveMenu 함수를 호출합니다.
            };

            /**
             * 페이지 이동 함수
             * @param {string} url - 이동할 페이지의 URL
             * @param {string} id - 메뉴 ID (메뉴 클릭 수 집계를 위해 사용)
             */
            moveMenu = function (url, id) {
              // 메뉴 ID가 있으면, AJAX를 통해 메뉴 클릭 수를 서버에 전송합니다.
              if (typeof id != "undefined" && id != null && id != "") {
                $.ajax({
                  type: "POST",
                  url: "https://www.mentalhealth.go.kr/portal/menu/menuHit.do",
                  data: {
                    menuNo: id,
                  },
                  async: false, // 동기 방식으로 실행하여, 이 요청이 끝날 때까지 다음 코드가 실행되지 않습니다.
                  dataType: "json",
                  success: function (returnData, status) {
                    // 성공 시 별도 처리 없음
                  },
                });
              }

              // URL이 유효하면 해당 URL로 페이지를 이동시킵니다.
              if (url != "" && url != "dir") window.location.href = url;
            };

            /**
             * 로그아웃 함수
             */
            logout = function () {
              if (confirm("로그아웃 하시겠습니까?")) {
                window.location.href = "https://www.mentalhealth.go.kr/portal/login/actionLogout.do";
              }
            };

            // 임시 비밀번호 또는 비밀번호 유효기간 만료 여부 확인 및 팝업 처리
            var indvdlTmprPasswordAtVal = "null";
            var passwordValidDeVal = "null";
            // 임시 비밀번호로 로그인한 경우, 비밀번호 변경 팝업을 표시합니다.
            if (indvdlTmprPasswordAtVal == "Y") {
              var modal = document.getElementById("passwordChange");
              modal.style.display = "block";
              return;
            }
            // 비밀번호 유효기간이 만료된 경우, 비밀번호 변경 안내 팝업을 표시합니다.
            else if (passwordValidDeVal == "Y") {
              var modal2 = document.getElementById("passwordChange2");
              modal2.style.display = "block";
              return;
            }

            /*
              주석 처리된 세션 체크 관련 코드
              - 주기적으로(300초마다) 사용자의 세션이 유효한지 서버에 확인하는 기능으로 추정됩니다.
              - 세션이 만료되면 'sessInvalidModal' 함수를 호출하여 세션 만료 팝업을 띄웁니다.
            */

            // 세션 만료 팝업을 표시하는 함수
            sessInvalidModal = function () {
              var modal = document.getElementById("sessInvalid");
              modal.style.display = "block";
            };

            // 세션 만료 팝업을 닫고 메인 페이지로 이동하는 함수
            closeSessPop = function () {
              var modal = document.getElementById("sessInvalid");
              modal.style.display = "none";
              location.href = "https://www.mentalhealth.go.kr/portal/main/index.do";
            };

            // 상단 검색창에서 Enter 키를 눌렀을 때 검색을 실행하는 이벤트 핸들러
            $("#searchDataTop").keypress(function (e) {
              if (e.keyCode == 13) {
                // Enter 키의 keyCode는 13입니다.
                fnSearchBtnTop();
              }
            });
          });

          // 로딩 팝업을 표시하는 함수
          function loadingPop() {
            var pop = document.getElementById("lodingPop");
            pop.style.display = "block";
          }
          //2022-12 국가정신건강서비스포털 고도화('22) 회원 서비스 중지

          // '내 콘텐츠' (스크랩) 팝업을 닫는 함수
          function myCtntPopClose() {
            var modal = document.getElementById("myCtntDiv");
            modal.style.display = "none";
            $(".scrap")[0].focus(); /* 웹접근성 webaccess_pub   */
          }

          // '내 콘텐츠' (스크랩)를 저장하는 함수
          function myCtntSave() {
            var sendctntSj = $("#ctntSj").val(); // 페이지명 입력값 가져오기
            // 페이지명이 비어있는지 확인
            if (sendctntSj == null || sendctntSj.trim() == "") {
              alert("페이지명을 입력해 주세요.");
              return;
            }

            // 동적으로 form을 생성하여 서버에 데이터를 전송합니다.
            var myctntForm = $("<form></form>");
            myctntForm.attr("name", "myctntForm");
            myctntForm.attr("id", "myctntForm");
            myctntForm.attr("method", "post");
            myctntForm.append($("<input/>", { type: "hidden", name: "ctntSj", value: $("#ctntSj").val() })); // 페이지명
            myctntForm.append($("<input/>", { type: "hidden", name: "ctntUrl", value: $("#myctntUrl").text() })); // 페이지 URL
            myctntForm.appendTo("body");

            // FormData 객체를 사용하여 AJAX로 폼 데이터 전송
            var formData = new FormData($("#myctntForm")[0]);
            $.ajax({
              type: "POST",
              url: "https://www.mentalhealth.go.kr/portal/myctnt/executeMyCtnt.do",
              data: formData,
              dataType: "json",
              processData: false, // FormData 사용 시 필수 설정
              contentType: false, // FormData 사용 시 필수 설정
              success: function (returnData, status) {
                if (confirm(returnData.message)) {
                  // 서버에서 받은 메시지를 confirm 창으로 보여줌
                  if (returnData.result) {
                    // 저장이 성공하면
                    var modal = document.getElementById("myCtntDiv");
                    modal.style.display = "none"; // 팝업 닫기
                    location.href = "https://www.mentalhealth.go.kr/portal/mypage/myctnt/myctntList.do"; // '내 콘텐츠 목록' 페이지로 이동
                  }
                } else {
                  var modal = document.getElementById("myCtntDiv");
                  modal.style.display = "none"; // 팝업 닫기
                  $(".scrap")[0].focus(); /* 웹 접근성을 위해 포커스 이동 */
                }
              },
              error: function (request, status, error) {
                alert("입력오류가 발생하였습니다.");
              },
            });
          }
          ////////////////////////////////////////////////////////

          // 비밀번호 변경 팝업(임시 비밀번호)을 닫는 함수
          function closePop1() {
            var modal1 = document.getElementById("passwordChange");
            modal1.style.display = "none";
          }

          // 비밀번호 변경 팝업(유효기간 만료)을 닫는 함수
          function closePop2() {
            var modal2 = document.getElementById("passwordChange2");
            modal2.style.display = "none";
          }

          // 비밀번호 변경 페이지로 이동하는 함수
          function goPassCg() {
            window.location.href = "https://www.mentalhealth.go.kr/portal/mypage/member/selectPassword.do";
          }

          // '다음에 변경하기' 선택 시 호출되는 함수
          function goPassNext() {
            window.location.href = "https://www.mentalhealth.go.kr/portal/mypage/member/nextPassword.do";
          }

          // 상단 검색창에서 검색을 실행하는 함수
          function fnSearchBtnTop() {
            var data = $("#searchDataTop").val();
            var url = "https://www.mentalhealth.go.kr/search/front/Search.jsp?qt=" + encodeURI(data); // 검색어를 UTF-8로 인코딩하여 URL 생성
            window.open(url); // 새 창에서 검색 결과 페이지를 엽니다.
          }

          // 디지털원패스 회원가입 팝업을 여는 함수
          function onePassRegistPop() {
            var popUrl = "https://www.onepass.go.kr/regist/agree?redirectSiteSeq=950";
            var popOption = "width=700, height=800, resizable=no, scrollbars=yes, status=no, title=디지털원패스 회원가입, top=100, left=100, location=no";
            window.name = "hcmhp";
            var popupWindow = window.open(popUrl, "디지털원패스 회원가입", popOption);
            popupWindow.focus();
          }

          // 디지털원패스 로그인 팝업을 여는 함수
          function onePassLoginPop() {
            var popUrl = "https://www.mentalhealth.go.kr/portal/digitalOnepass/loginout.do?serviceType=LOGIN";
            var popOption = "width=700, height=700, resizable=no, scrollbars=yes, status=no, title=디지털원패스 로그인, top=100, left=100, location=no";
            window.name = "hcmhp";
            var popupWindow = window.open(popUrl, "디지털원패스 로그인", popOption);
            popupWindow.focus();
          }

          // 인증 인터셉터에서 로그인 여부를 체크하여 원패스 로그인 창을 유도하는 함수
          // (2022-12 고도화 프로젝트에서 회원 서비스 중지로 인해 항상 true를 반환하도록 수정됨)
          function fnAuthOnePassLoginPop() {
            return true;
          }
})();

(function(){
$(document).ready(function () {
          /*처리 메세지*/
          if ("" != "") {
            alert("");
          }

          moveBbsDetail = function (bbsId, nttId) {
            var url = "https://www.mentalhealth.go.kr/portal/bbs/bbsDetail.do?bbsId=" + bbsId + "&nttId=" + nttId;
            location.href = "" + url + "";
          };

          //점검일 : 20230831, 취약점ID : , 취약점명 : 쿠키속정(SameSite)
          document.cookie = "safeCookie1=foo;SameSite=Lax";
          document.cookie = "safeCookie1=foo";
          document.cookie = "crossCookie=bar;SameSite=None;Secure";

          $("#searchData").keypress(function (e) {
            if (e.keyCode == 13) {
              fnSearchBtn();
            }
          });
        });

        function setCookie(name, value, expires) {
          var today = new Date();
          today.setDate(today.getDate() + expires);
          document.cookie = name + "=" + escape(value) + "; path=/; expires=" + today.toGMTString();
        }

        function getCookie(Name) {
          var search = Name + "=";
          if (document.cookie.length > 0) {
            // 쿠키가 설정되어 있다면
            offset = document.cookie.indexOf(search);
            if (offset != -1) {
              // 쿠키가 존재하면
              offset += search.length;
              // set index of beginning of value
              end = document.cookie.indexOf(";", offset);
              // 쿠키 값의 마지막 위치 인덱스 번호 설정
              if (end == -1) end = document.cookie.length;
              return unescape(document.cookie.substring(offset, end));
            }
          }
          return "";
        }

        function fnClose(id) {
          var todayVal = document.getElementById("check" + id);
          if ($(todayVal).prop("checked") == true) {
            setCookie(id, "Y", 1);
          }
          var pop1 = document.getElementById(id);
          pop1.style.display = "none";
        }

        function fnSearchBtn() {
          var data1 = $("#searchData").val();
          var data2 = $("#menu_info").val();
          var url = "https://www.mentalhealth.go.kr/search/front/Search.jsp?qt=" + encodeURI(data1) + "&menu=" + encodeURI(data2);
          //window.open(url);
          window.location.href = url;
        }
})();

(function(){
$(document).ready(function () {
          var mainSwiper = new Swiper(".main_visual .swiper-container", {
            autoplay: {
              delay: 3000,
              disableOnInteraction: false,
            },
            speed: 500,
            loop: false,
            pagination: {
              el: ".main_visual .swiper-pagination",
              type: "custom",
              renderCustom: function (swiper, current, total) {
                return "<span>0" + current + "</span>" + '<span class="line">ㅡ</span>' + '<span class="swiper-pagination-total">0' + total + "</span>";
              },
            },
            navigation: {
              nextEl: ".main_visual .swiper-button-next",
              prevEl: ".main_visual .swiper-button-prev",
            },
            on: {
              slideChange: function () {
                this.slides[this.activeIndex].focus();
              },
            },
            a11y: {
              enabled: true, // 접근성 기능 활성화
            },
          });

          var $mainPopup = $(".main_visual .swiper-container");
          $mainPopup.keyup(function () {
            $(this).find("#puase").trigger("click");
            $(this).find(".swiper-wrapper").css("transform", "translate3d(0,0,0)");
          });

          document.querySelector(".main_visual .swiper-button-prev").setAttribute("aria-label", "팝업존 이전 슬라이드");
          document.querySelector(".main_visual .swiper-button-next").setAttribute("aria-label", "팝업존 다음 슬라이드");

          var puaseButton = document.getElementById("puase");
          puaseButton.addEventListener("click", (event) => {
            mainSwiper.autoplay.stop();
            puaseButton.style.display = "none";
            playButton.style.display = "flex";
          });

          var playButton = document.getElementById("play");
          playButton.addEventListener("click", (event) => {
            mainSwiper.autoplay.start();
            playButton.style.display = "none";
            puaseButton.style.display = "flex";
          });

          var newsSwiper = new Swiper(".news_slider .swiper-container", {
            autoplay: {
              delay: 5000,
              disableOnInteraction: false,
            },
            speed: 500,
            loop: false,
            navigation: {
              nextEl: ".news_slider .swiper-button-next",
              prevEl: ".news_slider .swiper-button-prev",
            },
            on: {
              slideChange: function () {
                this.slides[this.activeIndex].focus();
              },
            },
            a11y: {
              enabled: true, // 접근성 기능 활성화
            },
          });

          var $newsPopup = $(".news_slider .swiper-container");
          $newsPopup.keyup(function () {
            $(this).find("#puaseNews").trigger("click");
            $(this).find(".swiper-wrapper").css("transform", "translate3d(0,0,0)");
          });

          document.querySelector(".news_slider .swiper-button-prev").setAttribute("aria-label", "인식개선 이전 슬라이드");
          document.querySelector(".news_slider .swiper-button-next").setAttribute("aria-label", "인식개선 다음 슬라이드");

          var puaseNewsButton = document.getElementById("puaseNews");
          puaseNewsButton.addEventListener("click", (event) => {
            newsSwiper.autoplay.stop();
            puaseNewsButton.style.display = "none";
            playNewsButton.style.display = "flex";
          });

          var playNewsButton = document.getElementById("playNews");
          playNewsButton.addEventListener("click", (event) => {
            newsSwiper.autoplay.start();
            playNewsButton.style.display = "none";
            puaseNewsButton.style.display = "flex";
          });
          playNewsButton.style.display = "none";
        });
})();

(function(){
$(document).ready(function () {});
})();

(function(){
window.addEventListener("load", () => {
            $(".ft-family > a").click(function () {
              event.preventDefault();
              $(".ft-family > ul").stop().slideToggle();
              $(".ft-family").stop().toggleClass("on");
            });
            $(document).on("click", function (event) {
              if (!$(event.target).closest(".ft-family").length) {
                $(".ft-family > ul").stop().slideUp();
              }
            });
          });
})();


/* Portfolio Popup Logic */
function showPopup() { const o = document.getElementById('popupOverlay'); if(o) o.classList.remove('hidden'); }
function closePopup() { const o = document.getElementById('popupOverlay'); if(o) o.classList.add('hidden'); }
window.addEventListener('DOMContentLoaded', () => {
  const c = document.querySelector('.popup-close-icon'); if(c) c.addEventListener('click', closePopup);
  const b = document.querySelector('.popup-confirm-btn'); if(b) b.addEventListener('click', closePopup);
  
  // Normalize placeholder links
  document.querySelectorAll('a[href="#"], a[href^="javascript:void(0)"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
    });
  });

  setTimeout(showPopup, 500);
});
