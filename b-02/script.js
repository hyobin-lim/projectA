// 비디오 슬라이드 관리
class VideoSlider {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 7;
        this.isPlaying = true;
        this.init();
    }

    init() {
        this.updateIndicator();
        this.setupControls();
    }

    updateIndicator() {
        const current = document.querySelector('.slide-indicator .current');
        if (current) {
            current.textContent = String(this.currentSlide + 1).padStart(2, '0');
        }
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateIndicator();
        // 비디오 소스 변경 로직 추가 가능
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateIndicator();
        // 비디오 소스 변경 로직 추가 가능
    }

    togglePlay() {
        const video = document.querySelector('.video');
        const btn = document.querySelector('.btn-pause');

        if (this.isPlaying) {
            video.pause();
            this.isPlaying = false;
            btn.classList.add('paused');
        } else {
            video.play();
            this.isPlaying = true;
            btn.classList.remove('paused');
        }
    }

    setupControls() {
        const btnNext = document.querySelector('.btn-next');
        const btnPrev = document.querySelector('.btn-prev');
        const btnPause = document.querySelector('.btn-pause');

        if (btnNext) btnNext.addEventListener('click', () => this.nextSlide());
        if (btnPrev) btnPrev.addEventListener('click', () => this.prevSlide());
        if (btnPause) btnPause.addEventListener('click', () => this.togglePlay());
    }
}

// 배너 슬라이드 관리
class BannerSlider {
    constructor() {
        this.currentSlide = 2; // 3번째 슬라이드 표시 (0부터 시작)
        this.totalSlides = 6;
        this.isPlaying = true;
        this.autoPlayInterval = null;
        this.init();
    }

    init() {
        this.updateIndicator();
        this.setupControls();
        this.startAutoPlay();
    }

    updateIndicator() {
        const indicator = document.querySelector('.banner-controls .indicator');
        if (indicator) {
            indicator.textContent = `${String(this.currentSlide + 1).padStart(2, '0')} / ${String(this.totalSlides).padStart(2, '0')}`;
        }
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateIndicator();
        // 슬라이드 애니메이션 로직 추가 가능
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateIndicator();
        // 슬라이드 애니메이션 로직 추가 가능
    }

    togglePlay() {
        const btn = document.querySelector('.banner-controls .btn-pause');

        if (this.isPlaying) {
            this.stopAutoPlay();
            this.isPlaying = false;
            btn.classList.add('paused');
        } else {
            this.startAutoPlay();
            this.isPlaying = true;
            btn.classList.remove('paused');
        }
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    setupControls() {
        const btnNext = document.querySelector('.banner-controls .btn-next');
        const btnPrev = document.querySelector('.banner-controls .btn-prev');
        const btnPause = document.querySelector('.banner-controls .btn-pause');

        if (btnNext) btnNext.addEventListener('click', () => {
            this.nextSlide();
            this.stopAutoPlay();
            this.startAutoPlay();
        });

        if (btnPrev) btnPrev.addEventListener('click', () => {
            this.prevSlide();
            this.stopAutoPlay();
            this.startAutoPlay();
        });

        if (btnPause) btnPause.addEventListener('click', () => this.togglePlay());
    }
}

// SNS 탭 전환
class SNSTabs {
    constructor() {
        this.init();
    }

    init() {
        const tabs = document.querySelectorAll('.sns-tabs .tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                tabs.forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                // 탭에 따른 콘텐츠 변경 로직 추가 가능
            });
        });
    }
}

// 스크롤 애니메이션
class ScrollAnimation {
    constructor() {
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        // 애니메이션 적용할 요소들
        const elements = document.querySelectorAll('.content-section, .news-card, .recipe-card, .sns-card');
        elements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }
}

// 헤더 스크롤 효과
class Header {
    constructor() {
        this.header = document.querySelector('.header');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        });
    }
}

// 스무스 스크롤
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    new VideoSlider();
    new BannerSlider();
    new SNSTabs();
    new ScrollAnimation();
    new Header();
    new SmoothScroll();

    // 스크롤 UI 애니메이션
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        setInterval(() => {
            scrollArrow.style.animation = 'none';
            setTimeout(() => {
                scrollArrow.style.animation = 'bounce 2s infinite';
            }, 10);
        }, 2000);
    }
});

// CSS 애니메이션 (style.css에 추가할 내용)
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 100% {
            transform: translateY(0) rotate(-45deg);
        }
        50% {
            transform: translateY(10px) rotate(-45deg);
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .fade-in {
        opacity: 0;
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .fade-in.visible {
        opacity: 1;
        animation: fadeInUp 0.6s ease;
    }

    .header.scrolled {
        background: rgba(0, 0, 0, 0.9);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .scroll-arrow {
        animation: bounce 2s infinite;
    }
`;
document.head.appendChild(style);
