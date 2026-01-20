// 반응형 메뉴
const hamburgerIcon = document.querySelector('.hamburger-icon');
const headerMenu = document.querySelector('.header-menu');

if (hamburgerIcon && headerMenu) {
  hamburgerIcon.addEventListener('click', () => {
    headerMenu.classList.toggle('active');
  });
}

// 스크롤 애니메이션
const observerOptions = {
  threshold: 0,              // 화면에 조금이라도 들어오면 실행
  rootMargin: '0px'          // margin 조건 제거
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');   // 보이는 상태로 변경
      observer.unobserve(entry.target);     // 한 번만 실행되도록 해제
    }
  });
}, observerOptions);

// 애니메이션 대상 요소
const animatedElements = document.querySelectorAll('.card, .grid-item, .bottom-icon-item');
animatedElements.forEach(el => {
  el.classList.add('hidden');   // 초기 상태는 숨김
  observer.observe(el);
});

// 이미지 로드 에러 처리
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    this.style.display = 'none';
    console.log('이미지 로드 실패:', this.src);
  });
});