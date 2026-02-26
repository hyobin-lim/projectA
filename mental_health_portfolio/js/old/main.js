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
  var playNewsButton = document.getElementById("playNews");

  if(puaseNewsButton) {
    puaseNewsButton.addEventListener("click", (event) => {
      newsSwiper.autoplay.stop();
      puaseNewsButton.style.setProperty("display", "none", "important");
      if(playNewsButton) playNewsButton.style.setProperty("display", "flex", "important");
    });
  }

  if(playNewsButton) {
    playNewsButton.addEventListener("click", (event) => {
      newsSwiper.autoplay.start();
      playNewsButton.style.setProperty("display", "none", "important");
      if(puaseNewsButton) puaseNewsButton.style.setProperty("display", "flex", "important");
    });
    playNewsButton.style.setProperty("display", "none", "important");
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

     // 검색 입력창에서 Enter 키 입력 시 동작
     $("#searchData").keypress(function (e) {
        if (e.keyCode == 13) {
          $("#searchBtn").click();
        }
     });
  });
// Custom slick slider initialization for .ban_list
$(function(){

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

	var $VisualPopupList = $('.ban_list .slick-slide');
	$VisualPopupList.each(function(){
		var $VisualPopupLink = $(this).children('a'),
			VisualPopupHref = $VisualPopupLink.attr('href');
		$VisualPopupLink.on('click', function(){
			if(!VisualPopupHref){
				return false;
			};
		});
	});
});

// Custom slick slider initialization for .app_list
$(function(){	
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
		$('.app_area .app_btn button.auto').removeClass('play').addClass('pause').text(''); // Corrected typo here
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

	var $VisualPopupList = $('.app_list .slick-slide');
	$VisualPopupList.each(function(){
		var $VisualPopupLink = $(this).children('a'),
			VisualPopupHref = $VisualPopupLink.attr('href');
		$VisualPopupLink.on('click', function(){
			if(!VisualPopupHref){
				return false;
			};
		});
	});
});