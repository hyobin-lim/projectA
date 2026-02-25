/* ?????? height 100% */
function heiEvt(){
	var $con = $("#container");
	var $conDiv = $("#container > div");
	var $footer = $("footer");

	if ($(window).width() > 960){
		var $footHei = 	$footer.height() + 1;
		//$con.css({"margin-bottom": "-" + $footHei + "px"})
		//$conDiv.css({"padding-bottom": $footHei + 70 + "px"})
	}else{
		var $footHei = 	$footer.height();
		//$con.css({"margin-bottom": "-" + $footHei + "px"})
		//$conDiv.css({"padding-bottom": $footHei + 30 + "px"})
	}
}

/* GNB Sticky Refactored */
function gnbMovEvt() {
    var $top_sticky = $(".gnb_area");
    var $path_top = $(".path_top");
    var $btn_home = $(".btn_home");
    var $path_h1 = $(".path_lnb h1");
    var $quick = $(".quick");
    var $top_area = $(".top_area");

    // Define the function to be executed on scroll and resize
    var scrollAndResizeAction = function() {
        var isDesktop = $(window).width() > 960;
        var isScrolled = $(window).scrollTop() > 93;

        if (isDesktop) {
            if (isScrolled) {
                $top_sticky.addClass("move");
                $path_top.addClass("move");
                $path_h1.addClass("move");
                $quick.addClass("move");
                $top_area.addClass("move");
                $btn_home.addClass("on");
            } else {
                $top_sticky.removeClass("move");
                $path_top.removeClass("move");
                $path_h1.removeClass("move");
                $quick.removeClass("move");
                $top_area.removeClass("move");
                $btn_home.removeClass("on");
            }
        } else {
            // For mobile, ensure classes are always removed
            $top_sticky.removeClass("move");
            $path_top.removeClass("move");
            $path_h1.removeClass("move");
            $quick.removeClass("move");
            $top_area.removeClass("move");
            $btn_home.removeClass("on");
        }
    };

    // Unbind any previous handlers to prevent duplicates
    $(window).off('scroll.gnb resize.gnb');
    
    // Bind the single handler to both scroll and resize events
    $(window).on('scroll.gnb resize.gnb', scrollAndResizeAction);

    // Run it once on load to set the initial state
    scrollAndResizeAction();
}


/* Mobile & PC GNB */
$(document).ready(function() {


	AOS.init({
		duration: 800,
	});

	var $gnb_nav = $(".gnb_nav");

	/* PC GNB */
	function gnbHoverEvent() {

		$gnb_nav.removeClass("m_nav").addClass("gnb_pc");
		$(function(){
			var $gnb_pc_box = $(".gnb_pc"),
				$gnb_pc = $(".gnb_pc #gnb"),
				$menu = $(".gnb_pc .th1"),
				$subList = $(".gnb_pc .th2");

			/* reset */
			$gnb_pc_box.removeClass("on");
			$(".gnb_pc .th1").off("click");
			$(".gnb_pc .th1 > a").off("click");
			$(".gnb_pc .th2>li>a").off("click");

			$(".gnb_pc").animate({"left":"0"}, 0);
			$(".gnb_pc #gnb").animate({"left":"0px"}, 0);
			$(".gnb_pc .th2").addClass("reset");
			$(".gnb_pc .th2").removeClass("on");
			$(".gnb_pc .th3").addClass("reset");

			// Mouse Hover Event for Desktop
			$gnb_pc.on("mouseenter focusin", function() {
				$subList.addClass("on");
				$gnb_pc_box.addClass("on");
			});
			
			// Mouse Leave Event - Close GNB automatically when mouse leaves the entire GNB area
			$gnb_pc_box.on("mouseleave", function() {
				$subList.removeClass("on");
				$gnb_pc_box.removeClass("on");
			});

			// Also close on focus out from the last item
			$gnb_pc.on("focusout", function(e) {
                // Use a short timeout to check if the new focused element is outside the GNB
                setTimeout(function() {
                    if ($gnb_pc_box.find(":focus").length === 0) {
                        $subList.removeClass("on");
                        $gnb_pc_box.removeClass("on");
                    }
                }, 10);
			});
		});
	}

	/* Mobile Menu */
	function gnbClickEvent() {
		$gnb_nav.removeClass("gnb_pc").addClass("m_nav");
		var $backdrop = $(".backdrop");

		/* reset */
		$(".m_nav").css({"left":"-1000px"});
		$(".m_nav #gnb").css({"left":"-1000px"});
		$(".backdrop").removeClass("in");

		/* ????????? ?????? */
		$(function(){
			$(".m_nav_btn").off("click").click(function(){
				$(".m_nav").animate({"left":"0px"}, 300);
				$(".m_nav #gnb").animate({"left":"0px"}, 300);
				$(".backdrop").addClass("in");
				$(".close").addClass("in");
				return false;
			});

			$(".close").off("click").on('click', function(e) {
				e.preventDefault();
				$(".m_nav").animate({"left":"-1000px"}, 300);
				$(".m_nav #gnb").animate({"left":"-1000px"}, 300);
				$(".backdrop").removeClass("in");
				$(".close").removeClass("in");
			});

			$backdrop.off("click").on('click', function() {
				$(".m_nav").animate({"left":"-1000px"}, 300);
				$(".m_nav #gnb").animate({"left":"-1000px"}, 300);
				$(".backdrop").removeClass("in");
				$(".close").removeClass("in");
			});
		});

		/* ????????? ???????????? */
		$(function(){
			var $th1Group = $(".m_nav .th1"),
				$th1 = $(".m_nav .th1 > a"),
				$subList = $(".th2"),
				$th2 = $(".m_nav .th2>li>a"),
				$th3Group = $(".m_nav .th3");

			/* reset */
			$th1Group.unbind("mouseenter, focusin, mouseleave, focusout");
			$th2.unbind("mouseenter, focusin, mouseleave, focusout");
			$(".m_nav .th2").removeClass("reset");
			$th3Group.removeClass("reset");

			$th1.removeClass("active");
			$th2.removeClass("active");
			$(".m_nav .th2").slideUp();
			$th3Group.slideUp();
			
			$th1.off("click").on('click', function(){
				$(this).toggleClass("active");
				$(this).next($subList).slideToggle();
				$(this).next($subList).removeClass("on");
				$(this).parent("li").siblings("li").children("a").removeClass("active");
				$(this).parent("li").siblings("li").find($subList).slideUp();
			});

			if ($(".m_nav .th3").length > 0 ) {
				$(".m_nav .th3").parent("li").addClass("under");
			};

			$th2.off("click").on('click', function() {
				$(this).next($th3Group).slideToggle();
				$(this).toggleClass("active");
				$(this).parent("li").siblings("li").children("a").removeClass("active");
				$(this).parent("li").siblings("li").find($th3Group).slideUp();
			});
		});
	}
	function gnbEventFunc(mql) {
		if (mql.matches) {
			gnbHoverEvent();
		} else {
			gnbClickEvent();
		}
	}
	var mql = window.matchMedia("(min-width:961px)");
	gnbEventFunc(mql);
	mql.addListener(gnbEventFunc);
});

/* ????????? Lnb */
function mLnb_Motion(){
	var $btn_m_lnb = $(".btn_m_lnb");
	var $lnb = $(".lnb");
	var lnbStates = true;
	$lnb.slideUp();

	if ($(window).width() < 961){
		$btn_m_lnb.off("click").on('click', function(e){
			e.preventDefault();

			if (lnbStates) {
				$lnb.slideDown();
				lnbStates = false;
			}else {
				$lnb.slideUp();
				lnbStates = true;
			}
		});

	}else{
		$lnb.css({"display":"none"});
		$lnb.slideUp();
		lnbStates = true;
	}

}

function mLnb(){
	if ( $(".lnb .lnb_th2 .lnb_th3").length > 0 ) {
		$(".lnb .lnb_th2 .lnb_th3").parent("li").addClass("up_over");
	};

	$(".lnb .lnb_th2>li.current .lnb_th3").slideDown();

	$(".lnb .lnb_th2>li>a").on("click",function(){
		$(this).parent("li").toggleClass("up");
		$(this).next(".lnb_th3").slideToggle();

	});
}

/* ????????? Top */
$(function(){
	$(".btn_top").fadeOut(300);
	$(window).scroll(function(){
		if ($(window).scrollTop() > 400){
			$(".btn_top").fadeIn(300);
		} else {
			$(".btn_top").fadeOut(300);
		};
	});
});

/* ?????? ???????????? */
function topSchArea(){
	var $btn_sch = $(".btn_sch");
	var $btn_sch_clo = $(".btn_sch_clo");
	var $sch_area = $(".sch_area");

	$btn_sch.off("click").click(function (e) {
		e.preventDefault();
		$(this).addClass("off");
		$btn_sch_clo.addClass("on");
		if ($(window).width() > 960){
			$sch_area.slideDown(500);
		}else{
			$sch_area.slideDown(0);
		}
		$(".gnb_nav").addClass("stop");
	});
	$btn_sch_clo.off("click").click(function (e) {
		e.preventDefault();
		$(this).removeClass("on");
		$btn_sch.removeClass("off");
		if ($(window).width() > 960){
			$sch_area.slideUp(500);
		}else{
			$sch_area.slideUp(0);
		}
		$(".gnb_nav").removeClass("stop");
	});

}

/* ???????????? ???????????? */
$(function(){
	var $sch_send = $(".sch_send");
	var $btn_sch_clo = $(".btn_sch_clo");

	$btn_sch_clo.focusout(function(e){
		e.preventDefault();
		$(".sch_wrap .sch_box select").focus();
	});
});

/* ???????????? */
function allMenu(){
	var $btn_all_menu = $(".all_menu > a");
	var $all_menu_area =$(".all_menu_area");
	var $btn_all_clo =$(".btn_all_clo");

	$btn_all_menu.off("click").click(function (e) {
		e.preventDefault();
		$all_menu_area.css({"display":"block"});
		$(".gnb_pc").addClass("stop");

        // Add class after a short delay to ensure element is visible and animation runs
        setTimeout(() => {
            $btn_all_clo.addClass('animating');
        }, 20);
	});

	$btn_all_clo.off("click").click(function(e) {
		e.preventDefault();
		$all_menu_area.css({"display":"none"});
		$btn_all_menu.focus();
        $(".gnb_pc").removeClass("stop");
        // Remove class to reset animation for next time
        $btn_all_clo.removeClass('animating');
	});
}

/* paging */
function pagingArea(){
	var $paging = $(".paging");

	if ($(window).width() < 481){
		$paging.addClass("mobile");
	}else{
		$paging.removeClass("mobile")
	}

}

/* ???????????? */
$(function(){
	var $accordi = $(".accordi"),
		$accordi_tit = $(".accordi .tit > a"),
		$accordi_con = $(".accordi_con");

		$(".accordi>li:first-child .tit>a").toggleClass("active");
	$(".accordi>li:first-child .tit>a").parent("div").next($accordi_con).show();
	$(".accordi>li:first-child .tit>a").parent("div").parent("li").toggleClass("trigger");
	/* 2020-12-10 ?????? */
	$(".accordi.faq>li:first-child .tit>a").parent("div").next($accordi_con).hide();
	$(".accordi.faq>li:first-child .tit>a").removeClass("active");

	$(".accordi>li:first-child .tit>a>.sr-only").text("?????? ??????");
	$(".accordi>li:not(:first-child) .tit>a>.sr-only").text("?????? ?????????");
	$(".accordi.faq>li:first-child .tit>a>.sr-only").text("?????? ?????????");
	
	$accordi_tit.off("click").on('click', function(e){
		e.preventDefault();

		$(this).toggleClass("active");
		
		if($(this).hasClass("active")){
			$(this).find(".sr-only").text("?????? ??????");
		}else{
			$(this).find(".sr-only").text("?????? ?????????");
		}
		
		$(this).parent("div").next($accordi_con).slideToggle();
		$(this).parent("div").parent("li").toggleClass("trigger");
	});


	$(".tab_content").each(function () {
		var $open_all = $(this).find(".open_all");
		var accordiStats = true;

		$open_all.off("click").on('click', function(e){
			e.preventDefault();

			if (accordiStats) {
				$(this).addClass("on");
				$(this).next(".accordi").find(".tit > a").addClass("active");
				$(this).next(".accordi").find(".accordi_con").slideDown(100);
				$(this).next(".accordi").children("li").addClass("trigger");
				$(this).find('span').text("?????? ?????? ?????? ??????");
				accordiStats = false;
				$(".accordi>li .tit>a>.sr-only").text("?????? ??????");
			}else {
				$(this).removeClass("on");
				$(this).next(".accordi").find(".tit > a").removeClass("active");
				$(this).next(".accordi").find(".accordi_con").slideUp(100);
				$(this).next(".accordi").children("li").removeClass("trigger");
				$(this).find('span').text("?????? ?????? ?????? ?????????");
				accordiStats = true;
				$(".accordi>li .tit>a>.sr-only").text("?????? ?????????");
			}

		});
	});

});

/* ???????????? */
function selfMenu(){
	var $self_btnOn = $(".self_list .on");
	var $self_none = $(".self_list .none");
	var $self_btnOff = $(".self_list .off");
	var $con = $(".self_list .con");

	if ($(window).width() > 767){
		$con.slideDown(0);
	}else{
		if ($self_none.length > 0) {
			$con.slideDown(0);
		}else{
			$con.slideUp(0);
		}
		$self_btnOn.off("click").click(function(e){
			e.preventDefault();
			$con.slideDown();
			$(this).addClass("none");
			$self_btnOff.addClass("view");
		});
		$self_btnOff.off("click").click(function(e){
			e.preventDefault();
			$con.slideUp();
			$(this).removeClass("view");
			$self_btnOn.removeClass("none");
		});
	}
}

/* ???????????? - ??????????????? */
function selfBtn(){
	var $self_arrow = $(".self_list > li > p");
	var $self_btn = $(".self_list .two");
    if($self_btn.length > 0) {
	    var $self_btnHei = $self_btn.height() + 32;
	    $self_arrow.css({"top":$self_btnHei + "px"});
    }
};

/* lineT ?????? */
$(function(){
	var $lineT = $(".lineT");
	var $lineT_td = $lineT.find("td");
	var $input_txt = $lineT.find("input[type=text]");
	var $input_pw = $lineT.find("input[type=password]");
	var $select = $lineT.find("select");
	var $textarea = $lineT.find("textarea");

	$lineT_td.each(function () {
		if ( $(this).find($input_txt).length > 0 ) {
			$(this).addClass("inputT");
		};
	});
	$lineT_td.each(function () {
		if ( $(this).find($input_pw).length > 0 ) {
			$(this).addClass("inputT");
		};
	});
	$lineT_td.each(function () {
		if ( $(this).find($select).length > 0 ) {
			$(this).addClass("inputT");
		};
	});
	$lineT_td.each(function () {
		if ( $(this).find($textarea).length > 0 ) {
			$(this).addClass("textareaT");
		};
	});
});


/* ???????????? - 04.28 */
function intgraSch(){
	var $open_sch = $(".open_sch");
	var $close_sch = $(".close_sch");
	var $sch_con = $(".sch_con");

	$open_sch.off("click").click(function (e) {
		e.preventDefault();
		$(this).addClass("off");
		$close_sch.addClass("on");
		$sch_con.slideDown(500);
	});
	$close_sch.off("click").click(function (e) {
		e.preventDefault();
		$(this).removeClass("on");
		$open_sch.removeClass("off");
		$sch_con.slideUp(500);
	});
}

$(function(){
	var $sch_date = $(".sch_date");
	var $sch_period = $(".sch_period");
	var schAllStats = true;

	$sch_date.off("click").click(function(e){
		e.preventDefault();

		if (schAllStats) {
			$sch_period.addClass("on");
			$(this).addClass("on");
			schAllStats = false;
		}else {
			$sch_period.removeClass("on");
			$(this).removeClass("on");
			schAllStats = true;
		}
	});
});

/* tab - 04.28 */
$(function () {
	$(".tab_content").addClass("off");
	$(".tab_content:first").removeClass("off").addClass("on");

	$(".tab_tit").off("click").click(function (e) {
		e.preventDefault();

		$(".tab_tit").removeClass("active");
		$(this).addClass("active");
		$(".tab_content").removeClass("on").addClass("off");
		var activeTab = $(this).find("h3").attr("class");
		$("#" + activeTab).addClass("on").removeClass("off");
		
		$(".sr-only").text("");
		$(this).find(".sr-only").text("?????????");
	});
});


/* ????????? ?????? */
$(function () {
	var $all_open = $(".all_open > a");
	var $part_two = $(".part_two");
	var diseaseStates = true;

	$all_open.off("click").on('click', function(e){
		e.preventDefault();

		if (diseaseStates) {
			$(this).addClass("on");
			$(this).text("???????????? ??????");
			$part_two.slideDown();
			diseaseStates = false;
		}else {
			$(this).removeClass("on");
			$part_two.slideUp();
			$(this).text("???????????? ??????");
			diseaseStates = true;
		}
	});
});


/* ???????????????*/
$(function () {
	$(".case_tit").next("p").addClass("case_img2");
	$(".case_txt").next("p").addClass("case_img2");
});

/* ??????????????? - ?????? ????????? height */
$(document).ready(function(){
	resizeHeight();

	$(window).resize(function(){
		resizeHeight();
	});
})
function resizeHeight(){
    if($(".case_img").length > 0) {
	    var $height = $(".case_img > p:nth-of-type(2)").height();
	    $(".case_img").height($height);
    }
}

/* ??????????????? - &nbsp; ?????? */
$(function(){
	$(".case_img_txt > p").html(function(i,html){
		return html.replace(/&nbsp;/g,'');
	})
})

$(window).on('load', function(){
	showPopup();
	gnbMovEvt();
	allMenu();
	topSchArea();
	heiEvt();
	mLnb_Motion();
	mLnb();
	selfMenu();
	selfBtn();
	intgraSch();
	pagingArea();
});

$(window).resize(function(){
	allMenu();
	topSchArea();
	heiEvt();
	mLnb_Motion();
	selfMenu();
	selfBtn();
	pagingArea();
});

/**
 * 페이지 로드 후 실행할 jQuery 스크립트.
 */
$(document).ready(function () {
  moveCheckLoginMenu = function (url) {
    moveMenu(url);
  };

  moveMenu = function (url, id) {
    if (typeof id != "undefined" && id != null && id != "") {
      $.ajax({
        type: "POST",
        url: "https://www.mentalhealth.go.kr/portal/menu/menuHit.do",
        data: {
          menuNo: id,
        },
        async: false,
        dataType: "json",
        success: function (returnData, status) {},
      });
    }

    if (url) {
        const mentalHealthDomain = 'www.mentalhealth.go.kr';
        const isMentalHealthInternalPath = url.startsWith('https://' + mentalHealthDomain) || url.startsWith('http://' + mentalHealthDomain) || url.startsWith('/portal/');
        const isExternalDomain = url.startsWith('http://') || url.startsWith('https://');

        if (isMentalHealthInternalPath) {
            alert("이 기능은 포트폴리오 버전에서 지원되지 않습니다.");
        } else if (isExternalDomain) {
            try {
                const targetHostname = new URL(url).hostname;
                if (targetHostname.includes(mentalHealthDomain)) {
                     alert("이 기능은 포트폴리오 버전에서 지원되지 않습니다.");
                } else { 
                    if (confirm("이 링크는 외부 사이트(" + url + ")로 연결됩니다. 계속하시겠습니까?")) {
                        window.open(url, '_blank');
                    }
                }
            } catch (e) {
                console.error("URL 파싱 오류:", e);
                alert("이 기능은 포트폴리오 버전에서 지원되지 않습니다.");
            }
        } else {
            window.location.href = url;
        }
    }
  };

  logout = function () {
    if (confirm("로그아웃 하시겠습니까?")) {
      window.location.href = "https://www.mentalhealth.go.kr/portal/login/actionLogout.do";
    }
  };

  sessInvalidModal = function () {
    var modal = document.getElementById("sessInvalid");
    if(modal) modal.style.display = "block";
  };

  closeSessPop = function () {
    var modal = document.getElementById("sessInvalid");
    if(modal) {
        modal.style.display = "none";
        location.href = "./index.html";
    }
  };

  $("#searchDataTop").off("keypress").keypress(function (e) {
    if (e.keyCode == 13) {
                  fnSearchBtnTop();
              }
          });

          // New comprehensive link handling logic - 정교화된 선택자 적용
          $(document).on('click', 'a', function(e) {
              const $this = $(this);
              const href = $this.attr('href');
              
              // 1. 제외 대상: 로고, 전체메뉴 열기/닫기 버튼, 푸터 패밀리 사이트 버튼
              if ($this.is('footer .ft-family > a') || $this.is('.all_menu > a') || $this.is('.top_area h1 a') || $this.is('.m_nav_btn')) {
                  return; 
              }

              // 2. 제외 대상: GNB 상위 메뉴 (서브메뉴를 열기 위한 링크)
              // PC 버전에서 상위 메뉴 클릭 시 alert 방지
              if ($this.parents('.gnb_pc').length > 0 && $this.parent('.th1').length > 0) {
                  e.preventDefault(); // 실제 이동은 막되 alert는 안 띄움
                  return;
              }
              // 모바일 버전에서 상위 메뉴 클릭 시 alert 방지
              if ($this.parents('.m_nav').length > 0 && ($this.parent('.th1').length > 0 || $this.parent('.under').length > 0)) {
                  return; // 모바일 GNB 아코디언 동작 허용
              }

              if (!href || href === '#' || href.startsWith('javascript:')) {
                  return; 
              }

              const mentalHealthDomain = 'www.mentalhealth.go.kr';
              const currentHostname = window.location.hostname;
              const isMentalHealthInternalOrPortal = (href.startsWith('https://' + mentalHealthDomain) || href.startsWith('http://' + mentalHealthDomain) || href.startsWith('/portal/'));

              let isTrulyExternalDomain = false;
              if (href.startsWith('http://') || href.startsWith('https://')) {
                  try {
                      const targetUrl = new URL(href);
                      if (!targetUrl.hostname.includes(mentalHealthDomain) && targetUrl.hostname !== currentHostname) {
                          isTrulyExternalDomain = true;
                      }
                  } catch (err) {
                      console.error("URL 파싱 오류 (a tag click):", err);
                      alert("이 기능은 포트폴리오 버전에서 지원되지 않습니다.");
                      e.preventDefault();
                      return;
                  }
              }

              if (isMentalHealthInternalOrPortal) {
                  e.preventDefault();
                  alert("이 기능은 포트폴리오 버전에서 지원되지 않습니다.");
              } else if (isTrulyExternalDomain) {
                  e.preventDefault();
                  if (confirm("이 링크는 외부 사이트(" + href + ")로 연결됩니다. 계속하시겠습니까?")) {
                      window.open(href, '_blank');
                  }
              }
          });

     $('#searchBtn').off("click").on('click', function(e) {
         e.preventDefault();
         const anim = document.getElementById('searchAnim1');
         if(anim) anim.beginElement();

         setTimeout(() => {
             var searchKeyword = $("#searchData").val();
             if (searchKeyword.trim() !== "") {
                 alert("'" + searchKeyword + "' 에 대한 검색 기능은 현재 포트폴리오에서 구현하지 않았습니다.");
             } else {
                 alert("검색어를 입력해주세요.");
             }
         }, 350);
     });
});

function loadingPop() {
  var pop = document.getElementById("lodingPop");
  if(pop) pop.style.display = "block";
}

function myCtntPopClose() {
  var modal = document.getElementById("myCtntDiv");
  if(modal) modal.style.display = "none";
  $(".scrap")[0].focus();
}

function myCtntSave() {
  var sendctntSj = $("#ctntSj").val();
  if (sendctntSj == null || sendctntSj.trim() == "") {
    alert("페이지명을 입력해 주세요");
    return;
  }

  var myctntForm = $("<form></form>");
  myctntForm.attr("name", "myctntForm");
  myctntForm.attr("id", "myctntForm");
  myctntForm.attr("method", "post");
  myctntForm.append($("<input/>", { type: "hidden", name: "ctntSj", value: $("#ctntSj").val() }));
  myctntForm.append($("<input/>", { type: "hidden", name: "ctntUrl", value: $("#myctntUrl").text() }));
  myctntForm.appendTo("body");

  var formData = new FormData($("#myctntForm")[0]);
  $.ajax({
    type: "POST",
    url: "https://www.mentalhealth.go.kr/portal/myctnt/executeMyCtnt.do",
    data: formData,
    dataType: "json",
    processData: false,
    contentType: false,
    success: function (returnData, status) {
      if (confirm(returnData.message)) {
        if (returnData.result) {
          var modal = document.getElementById("myCtntDiv");
          if(modal) modal.style.display = "none";
          location.href = "https://www.mentalhealth.go.kr/portal/mypage/myctnt/myctntList.do";
        }
      } else {
        var modal = document.getElementById("myCtntDiv");
        if(modal) modal.style.display = "none";
        $(".scrap")[0].focus();
      }
    },
    error: function (request, status, error) {
      alert("입력오류가 발생하였습니다");
    },
  });
}

function closePop1() {
  var modal1 = document.getElementById("passwordChange");
  if(modal1) modal1.style.display = "none";
}

function closePop2() {
  var modal2 = document.getElementById("passwordChange2");
  if(modal2) modal2.style.display = "none";
}

function goPassCg() {
  window.location.href = "https://www.mentalhealth.go.kr/portal/mypage/member/selectPassword.do";
}

function goPassNext() {
  window.location.href = "https://www.mentalhealth.go.kr/portal/mypage/member/nextPassword.do";
}

function fnSearchBtnTop() {
  alert("검색 기능은 포트폴리오 버전에서 지원되지 않습니다.");
}

function onePassRegistPop() {
  var popUrl = "https://www.onepass.go.kr/regist/agree?redirectSiteSeq=950";
  var popOption = "width=700, height=800, resizable=no, scrollbars=yes, status=no, title=디지털원패스 회원가입, top=100, left=100, location=no";
  window.name = "hcmhp";
  var popupWindow = window.open(popUrl, "디지털원패스 회원가입", popOption);
  if(popupWindow) popupWindow.focus();
}

function onePassLoginPop() {
  var popUrl = "https://www.mentalhealth.go.kr/portal/digitalOnepass/loginout.do?serviceType=LOGIN";
  var popOption = "width=700, height=700, resizable=no, scrollbars=yes, status=no, title=디지털원패스 로그인, top=100, left=100, location=no";
  window.name = "hcmhp";
  var popupWindow = window.open(popUrl, "디지털원패스 로그인", popOption);
  if(popupWindow) popupWindow.focus();
}

function fnAuthOnePassLoginPop() {
  return true;
}

$(document).ready(function () {
  var mainSwiper = new Swiper(".main_visual .swiper-container", {
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 500,
    loop: true,
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
        if (this.slides[this.activeIndex]) {
            this.slides[this.activeIndex].focus();
        }
      },
    },
    a11y: {
      enabled: true,
    },
  });

  var puaseButton = document.getElementById("puase");
  if(puaseButton) {
    puaseButton.addEventListener("click", (event) => {
      mainSwiper.autoplay.stop();
      puaseButton.style.display = "none";
      playButton.style.display = "flex";
    });
  }

  var playButton = document.getElementById("play");
  if(playButton) {
    playButton.addEventListener("click", (event) => {
      mainSwiper.autoplay.start();
      playButton.style.display = "none";
      puaseButton.style.display = "flex";
    });
  }

  var newsSwiper = new Swiper(".news_slider .swiper-container", {
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 500,
    loop: true,
    navigation: {
      nextEl: ".news_slider .swiper-button-next",
      prevEl: ".news_slider .swiper-button-prev",
    },
    on: {
      slideChange: function () {
        if (this.slides[this.activeIndex]) {
            this.slides[this.activeIndex].focus();
        }
      },
    },
    a11y: {
      enabled: true,
    },
  });

  var puaseNewsButton = document.getElementById("puaseNews");
  if(puaseNewsButton) {
    puaseNewsButton.addEventListener("click", (event) => {
      newsSwiper.autoplay.stop();
      puaseNewsButton.style.display = "none";
      playNewsButton.style.display = "flex";
    });
  }

  var playNewsButton = document.getElementById("playNews");
  if(playNewsButton) {
    playNewsButton.addEventListener("click", (event) => {
      newsSwiper.autoplay.start();
      playNewsButton.style.display = "none";
      puaseNewsButton.style.display = "flex";
    });
    playNewsButton.style.display = "none";
  }

  $(".ft-family > a").click(function (event) {
    event.preventDefault();
    $(".ft-family > ul").stop().slideToggle();
    $(".ft-family").stop().toggleClass("on");
  });

  $(document).on("click", function (event) {
    if (!$(event.target).closest(".ft-family").length) {
      $(".ft-family > ul").stop().slideUp();
    }
  });

     $("#searchData").off("keypress").keypress(function (e) {
        if (e.keyCode == 13) {
          $("#searchBtn").click();
        }
     });
  });

// Custom slick slider initialization for .ban_list
$(function(){
    if($('.ban_list').length > 0) {
        var VisualLength = $('.ban_list > div').length;
        if(VisualLength>1){
            $('.ban_btn .auto').addClass('play').text('');
        } else{
            $('.ban_btn .auto').addClass('pause').text('');
        };
        $('.ban_area .ban_list').slick({
            swipe : true,
            draggable : true,
            slidesToShow : 1,
            slidesToScroll: 1,
            vertical : false,
            autoplay : true,
            infinite: true,
            dots : true,
            appendDots: $('.ban_btn .dotbox'),
            prevArrow : false,
            nextArrow : false
        });

        $('.ban_area .slick-dots button').on('click', function(){
            $('.ban_area .ban_list').slick('slickPause');
            $('.ban_area .ban_btn button.auto').removeClass('play').addClass('pause').text('');
        });

        $('.ban_area .ban_list').on('swipe', function(event, slick, direction){
            $('.ban_area .ban_list').slick('slickPause');
            $('.ban_area .ban_btn button.auto').removeClass('play').addClass('pause').text('');
        });

        $('.ban_area .ban_btn button.auto').click(function(){
            var NowPlaying = $(this).is('.play');
            if(NowPlaying==true){
                $('.ban_area .ban_list').slick('slickPause');
                $(this).removeClass('play').addClass('pause').text('');
            } else if(NowPlaying==false){
                $('.ban_area .ban_list').slick('slickPlay');
                $(this).removeClass('pause').addClass('play').text('');
            };
        });
    }
});

// Custom slick slider initialization for .app_list
$(function(){	
    if($('.app_list').length > 0) {
        var VisualLength = $('.app_list > div').length;
        if(VisualLength>1){
            $('.app_btn .auto').addClass('play').text('');
        } else{
            $('.app_btn .auto').addClass('pause').text('');
        };
        $('.app_area .app_list').slick({
            swipe : true,
            draggable : true,
            slidesToShow : 1,
            slidesToScroll: 1,
            vertical : false,
            autoplay : true,
            infinite: true,
            dots : true,
            appendDots: $('.app_btn .dotbox'),
            prevArrow : false,
            nextArrow : false
        });

        $('.app_area .slick-dots button').on('click', function(){
            $('.app_area .app_list').slick('slickPause');
            $('.app_area .app_btn button.auto').removeClass('play').addClass('pause').text(''); 
        });

        $('.app_area .app_list').on('swipe', function(event, slick, direction){
            $('.app_area .app_list').slick('slickPause');
            $('.app_area .app_btn button.auto').removeClass('play').addClass('pause').text('');
        });

        $('.app_area .app_btn button.auto').click(function(){
            var NowPlaying = $(this).is('.play');
            if(NowPlaying==true){
                $('.app_area .app_list').slick('slickPause');
                $(this).removeClass('play').addClass('pause').text('');
            } else if(NowPlaying==false){
                $('.app_area .app_list').slick('slickPlay');
                $(this).removeClass('pause').addClass('play').text('');
            };
        });
    }
});

function showPopup() {
  const overlay = document.getElementById("popupOverlay");
  if (overlay) {
    overlay.classList.remove('hidden');
  }
}

function closePopup() {
  const overlay = document.getElementById("popupOverlay");
  if (overlay) {
    overlay.classList.add('hidden');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const closeIconButton = document.querySelector('.popup-close-icon');
  if (closeIconButton) {
    closeIconButton.addEventListener('click', closePopup);
  }

  const confirmButton = document.querySelector('.popup-confirm-btn');
  if (confirmButton) {
    confirmButton.addEventListener('click', closePopup);
  }
});
