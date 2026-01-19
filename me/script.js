// 반응형 메뉴
const hamburgerIcon = document.querySelector('.hamburger-icon');
const headerMenu = document.querySelector('.header-menu');

if (hamburgerIcon) {
    hamburgerIcon.addEventListener('click', () => {
        headerMenu.classList.toggle('active');
    });
}

// 스크롤 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 애니메이션 대상 요소
const animatedElements = document.querySelectorAll('.card, .grid-item, .bottom-icon-item');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// 이미지 로드 에러 처리
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        console.log('이미지 로드 실패:', this.src);
    });
});
