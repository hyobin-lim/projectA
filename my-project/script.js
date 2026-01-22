$(document).ready(function () {
    // 1. AOS (애니메이션 라이브러리) 초기화
    if (typeof AOS !== 'undefined') {
        AOS.init();
    }

    // 2. 메인 비주얼 슬라이더 (Swiper)
    var mainSwiper = new Swiper(".main_visual .swiper-container", {
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        speed: 500,
        loop: true,
        pagination: {
            el: ".main_visual .swiper-pagination",
            type: 'custom',
            renderCustom: function (swiper, current, total) {
                var curr = current < 10 ? '0' + current : current;
                var tot = total < 10 ? '0' + total : total;
                return '<span>' + curr + '</span>' + '<span class="line">ㅡ</span>' + '<span class="swiper-pagination-total">' + tot + '</span>';
            }
        },
        navigation: {
            nextEl: ".main_visual .swiper-button-next",
            prevEl: ".main_visual .swiper-button-prev"
        },
        a11y: { enabled: true }
    });

    // 메인 슬라이더 재생/정지 버튼
    $(".main_visual #puase").on("click", function() {
        mainSwiper.autoplay.stop();
        $(this).hide();
        $(this).siblings("#play").css("display", "flex").focus();
    });
    $(".main_visual #play").on("click", function() {
        mainSwiper.autoplay.start();
        $(this).hide();
        $(this).siblings("#puase").css("display", "flex").focus();
    });

    // 3. 뉴스 슬라이더
    var newsSwiper = new Swiper(".news_slider .swiper-container", {
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        speed: 500,
        loop: true,
        navigation: {
            nextEl: ".news_slider .swiper-button-next",
            prevEl: ".news_slider .swiper-button-prev"
        },
        a11y: { enabled: true }
    });

    // 뉴스 슬라이더 재생/정지 버튼
    $(".news_slider #puaseNews").on("click", function() {
        newsSwiper.autoplay.stop();
        $(this).hide();
        $(this).siblings("#playNews").css("display", "flex").focus();
    });
    $(".news_slider #playNews").on("click", function() {
        newsSwiper.autoplay.start();
        $(this).hide();
        $(this).siblings("#puaseNews").css("display", "flex").focus();
    });

    // 4. 상단 검색창 토글
    $(".btn_sch").on("click", function(e) {
        e.preventDefault();
        $(".sch_area").slideToggle(200);
    });
    $(".btn_sch_clo").on("click", function(e) {
        e.preventDefault();
        $(".sch_area").slideUp(200);
    });

    // 5. 푸터 패밀리 사이트 토글
    $('.ft-family > a').click(function(event){
        event.preventDefault();
        $(this).parent().toggleClass('on');
        $(this).next('ul').slideToggle(200);
    });
    
    // 외부 클릭 시 패밀리 사이트 닫기
    $(document).on('click', function (event) {
        if (!$(event.target).closest('.ft-family').length) {
            $('.ft-family').removeClass('on');
            $('.ft-family > ul').slideUp(200);
        }
    });
});

// 메뉴 이동 더미 함수
function moveMenu(url) {
    console.log("이동하려는 URL: " + url);
}