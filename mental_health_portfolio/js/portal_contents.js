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

/* GNB Sticky */
function gnbMovEvt(){

	var $header = $("header");
	var $top_sticky = $(".gnb_area");
	var $path_top = $(".path_top");
	var $btn_home = $(".btn_home");
	var $path_h1 = $(".path_lnb h1");
	var $quick = $(".quick");
	var $top_area = $(".top_area");


	if ($(window).width() > 960){

		if ($(window).scrollTop() > 93){
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
		};

		$(window).scroll(function(){
			if ($(window).scrollTop() > 93){
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
			};
		});
	} else{
		$top_sticky.removeClass("move");
		$path_top.removeClass("move");
		$path_h1.removeClass("move");
		$quick.removeClass("move");
		$top_area.removeClass("move");
		$btn_home.removeClass("on");

		$(window).scroll(function(){
			if ($(window).scrollTop() > 93){
				$top_sticky.removeClass("move");
				$path_top.removeClass("move");
				$path_h1.removeClass("move");
				$btn_home.removeClass("on");
			} else {
				$top_sticky.removeClass("move");
				$path_top.removeClass("move");
				$path_h1.removeClass("move");
				$btn_home.removeClass("on");
			};
		});
	};

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
			$gnb_pc = $(".gnb_pc #gnb"),
				$menu = $(".gnb_pc .th1"),
				$subList = $(".gnb_pc .th2"),

				/* reset */
				$gnb_pc.parent(".gnb_pc").removeClass("on");
			$(".gnb_pc .th1").off("click");
			$(".gnb_pc .th1 > a").off("click");
			$(".gnb_pc .th2>li>a").off("click");

			$(".gnb_pc").animate({"left":"0"}, 0);
			$(".gnb_pc #gnb").animate({"left":"0px"}, 0);
			$(".gnb_pc .th2").addClass("reset");
			$(".gnb_pc .th2").removeClass("on");
			$(".gnb_pc .th3").addClass("reset");
			/**/

			$gnb_pc.bind("mouseenter focusin", function() {
				//$(this).addClass("on").siblings().removeClass("on");			
				$subList.addClass("on");
				$gnb_pc.parent(".gnb_pc").addClass("on");
			});
			$gnb_pc.bind("mouseleave focusout", function() {
				//$(this).removeClass("on");				
				$subList.removeClass("on");
				$gnb_pc.parent(".gnb_pc").removeClass("on");
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
			$(".m_nav_btn").click(function(){
				$(".m_nav").animate({"left":"0px"}, 300);
				$(".m_nav #gnb").animate({"left":"0px"}, 300);
				$(".backdrop").addClass("in");
				$(".close").addClass("in");
				return false;
			});

			$(".close").on('click', function(e) {
				e.preventDefault();
				$(".m_nav").animate({"left":"-1000px"}, 300);
				$(".m_nav #gnb").animate({"left":"-1000px"}, 300);
				$(".backdrop").removeClass("in");
				$(".close").removeClass("in");
			});

			$backdrop.on('click', function() {
				$(".m_nav").animate({"left":"-1000px"}, 300);
				$(".m_nav #gnb").animate({"left":"-1000px"}, 300);
				$(".backdrop").removeClass("in");
				$(".close").removeClass("in");
			});
		});

		/* ????????? ???????????? */
		$(function(){
			$th1Group = $(".m_nav .th1"),
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
			/**/

			//$(".m_nav").find("#gnb > ul > li:first>a").toggleClass("active");
			//$(".m_nav").find("#gnb > ul > li:first>a").next($subList).show();			

			$th1.on('click', function(){
				$(this).toggleClass("active");
				$(this).next($subList).slideToggle();
				$(this).next($subList).removeClass("on");
				$(this).parent("li").siblings("li").children("a").removeClass("active");
				$(this).parent("li").siblings("li").find($subList).slideUp();
			});

			if ($(".m_nav .th3").length > 0 ) {
				$(".m_nav .th3").parent("li").addClass("under");
			};

			$th2.on('click', function() {
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
	$btn_m_lnb = $(".btn_m_lnb");
	$lnb = $(".lnb");
	var lnbStates = true;
	$lnb.slideUp();

	if ($(window).width() < 961){
		$btn_m_lnb.on('click', function(e){
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

	$btn_sch.click(function (e) {
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
	$btn_sch_clo.click(function (e) {
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

	$btn_all_menu.click(function (e) {
		e.preventDefault();
		$all_menu_area.css({"display":"block"});
		$(".gnb_pc").addClass("stop");
	});

	$btn_all_clo.click(function(e) {
		e.preventDefault();
		$all_menu_area.css({"display":"none"});
		$btn_all_menu.focus();
		$(".gnb_pc").removeClass("stop");
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
	$accordi = $(".accordi"),
		$accordi_li = $(".accordi  > li"),
		$accordi_tit = $(".accordi .tit > a"),
		$accordi_con = $(".accordi_con"),

		$(".accordi>li:first-child .tit>a").toggleClass("active");
	$(".accordi>li:first-child .tit>a").parent("div").next($accordi_con).show();
	$(".accordi>li:first-child .tit>a").parent("div").parent("li").toggleClass("trigger");
	/* 2020-12-10 ?????? */
	$(".accordi.faq>li:first-child .tit>a").parent("div").next($accordi_con).hide();
	$(".accordi.faq>li:first-child .tit>a").removeClass("active");

	/*$(".accordi>li:first-child .tit>a").attr("title", "?????? ??????");
	$(".accordi>li:not(:first-child) .tit>a").attr("title", "?????? ?????????");
	$(".accordi.faq>li:first-child .tit>a").attr("title", "?????? ?????????");*/
	
	$(".accordi>li:first-child .tit>a>.sr-only").text("?????? ??????");
	$(".accordi>li:not(:first-child) .tit>a>.sr-only").text("?????? ?????????");
	$(".accordi.faq>li:first-child .tit>a>.sr-only").text("?????? ?????????");
	
	$accordi_tit.on('click', function(e){
		e.preventDefault();

		$(this).toggleClass("active");
		
		if($(this).hasClass("active")){
			/*$(this).attr("title", "?????? ??????");*/
			$(this).find(".sr-only").text("?????? ??????");
		}else{
			/*$(this).attr("title", "?????? ?????????");*/
			$(this).find(".sr-only").text("?????? ?????????");
		}
		
		$(this).parent("div").next($accordi_con).slideToggle();
		$(this).parent("div").parent("li").toggleClass("trigger");
		//$(this).parent("p").parent("li").siblings("li").find(".tit > a").removeClass("active");
		//$(this).parent("p").parent("li").siblings("li").find($accordi_con).slideUp();
	});


	$(".tab_content").each(function () {
		var $open_all = $(this).find(".open_all");

		var accordiStats = true;

		$open_all.on('click', function(e){
			e.preventDefault();

			if (accordiStats) {
				$(this).addClass("on");
				$(this).next($accordi).find($accordi_tit).addClass("active");
				$(this).next($accordi).find($accordi_con).slideDown(100);
				$(this).next($accordi).children("li").addClass("trigger");
				$(this).find('span').text("?????? ?????? ?????? ??????");
				accordiStats = false;
				
				$(".accordi>li .tit>a>.sr-only").text("?????? ??????");
			}else {
				$(this).removeClass("on");
				$(this).next($accordi).find($accordi_tit).removeClass("active");
				$(this).next($accordi).find($accordi_con).slideUp(100);
				$(this).next($accordi).children("li").removeClass("trigger");
				$(this).find('span').text("?????? ?????? ?????? ?????????");
				accordiStats = true;
				
				$(".accordi>li .tit>a>.sr-only").text("?????? ?????????");
			}

		});
	});

});

/* ???????????? */
function selfMenu(){
	var $self_list = $(".self_list");
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
		$self_btnOn.click(function(e){
			e.preventDefault();
			$con.slideDown();
			$(this).addClass("none");
			$self_btnOff.addClass("view");
		});
		$self_btnOff.click(function(e){
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
	var $self_btnHei = $self_btn.height() + 32;

	$self_arrow.css({"top":$self_btnHei + "px"});
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

	$open_sch.click(function (e) {
		e.preventDefault();
		$(this).addClass("off");
		$close_sch.addClass("on");
		$sch_con.slideDown(500);
	});
	$close_sch.click(function (e) {
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

	$sch_date.click(function(e){
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

	/*$("a:last", ".sch_period").blur(function () {
		$sch_period.slideUp();
		$sch_date.removeClass("on");
		schAllStats = true;	
	});*/
});

/* tab - 04.28 */
$(function () {
	$(".tab_content").addClass("off");
	$(".tab_content:first").removeClass("off").addClass("on");

	$(".tab_tit").click(function (e) {
		e.preventDefault();

		$(".tab_tit").removeClass("active");
		$(this).addClass("active");
		$(".tab_content").removeClass("on").addClass("off");
		var activeTab = $(this).find("h3").attr("class");
		$("#" + activeTab).addClass("on").removeClass("off");
		
		/*???????????? ?????? ?????? ??????, 2025-06-30*/
		$(".sr-only").text("");
		$(this).find(".sr-only").text("?????????");
	});
});


/* ????????? ?????? */
$(function () {
	var $all_open = $(".all_open > a");
	var $part_two = $(".part_two");
	var $tab_order = $(".disease_part > ul:nth-of-type(1) > li:first-child > a");
	var diseaseStates = true;

	$all_open.on('click', function(e){
		e.preventDefault();

		if (diseaseStates) {
			$(this).addClass("on");
			$(this).text("???????????? ??????");
			$part_two.slideDown();
			$tab_order.focus();

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
	$height = $(".case_img > p:nth-of-type(2)").height();
	$(".case_img").height($height);
}

/* ??????????????? - &nbsp; ?????? */
$(function(){
	$(".case_img_txt > p").html(function(i,html){
		return html.replace(/&nbsp;/g,'');
	})
})

/* ??????  
function modalPop(){
	var $modal = $(".modal-content");	
	var $win = $(window).width();	
	var $modal_Wid = $win / 2;	
	var $modal_mar = $modal_Wid / 2;

	$modal.css({"margin-left":"-" + $modal_mar + "px"});
	
	console.log($modal_Wid);
};
*/

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
	//modalPop();

});

$(window).resize(function(){
	gnbMovEvt();
	allMenu();
	topSchArea();
	heiEvt();
	mLnb_Motion();
	selfMenu();
	selfBtn();
	pagingArea();
	//modalPop();
});






/* === */


