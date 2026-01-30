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

  // 검색 버튼 클릭 시 동작 (포트폴리오용)
  $("#searchBtn").click(function() {
      var searchKeyword = $("#searchData").val();
      if(searchKeyword.trim() !== "") {
        console.log("검색 실행 (키워드: " + searchKeyword + ")");
        alert("'" + searchKeyword + "' 에 대한 검색 기능은 현재 포트폴리오에서 구현되지 않았습니다.");
      } else {
        alert("검색어를 입력해주세요.");
      }
   });

   // 검색 입력창에서 Enter 키 입력 시 동작
   $("#searchData").keypress(function (e) {
      if (e.keyCode == 13) {
        $("#searchBtn").click();
      }
   });
});