/* Source: popup.js */
// 포트폴리오 고지 팝업을 표시하는 함수
function showPopup() {
  const overlay = document.getElementById("popupOverlay");
  if (overlay) {
    overlay.classList.remove('hidden');
  }
}

// 포트폴리오 고지 팝업을 닫는 함수
function closePopup() {
  const overlay = document.getElementById("popupOverlay");
  if (overlay) {
    overlay.classList.add('hidden');
  }
}

// DOM이 로드된 후 이벤트 리스너를 추가합니다.
document.addEventListener('DOMContentLoaded', () => {
  // 헤더의 'x' 닫기 버튼에 이벤트 리스너 추가
  const closeIconButton = document.querySelector('.popup-close-icon');
  if (closeIconButton) {
    closeIconButton.addEventListener('click', closePopup);
  }

  // 푸터의 '확인' 버튼에 이벤트 리스너 추가
  const confirmButton = document.querySelector('.popup-confirm-btn');
  if (confirmButton) {
    confirmButton.addEventListener('click', closePopup);
  }
});


/* Source: inline_scripts.js */
/* Portfolio Extracted Scripts & Normalization */

/* 1. Portfolio Popup Logic */
function showPopup() { 
  const o = document.getElementById('popupOverlay'); 
  if(o) o.classList.remove('hidden'); 
}

function closePopup() { 
  const o = document.getElementById('popupOverlay'); 
  if(o) o.classList.add('hidden'); 
}

/* 2. Initialization & Link Normalization */
window.addEventListener('DOMContentLoaded', () => {
  // Popup events
  const c = document.querySelector('.popup-close-icon'); 
  if(c) c.addEventListener('click', closePopup);
  
  const b = document.querySelector('.popup-confirm-btn'); 
  if(b) b.addEventListener('click', closePopup);
  
  // Normalize placeholder links (excluding those with specific functionality)
  document.querySelectorAll('a[href="#"], a[href^="javascript:void(0)"]').forEach(link => {
    link.addEventListener('click', (e) => {
      // Swiper/Slick 버튼이나 특정 기능을 가진 링크(푸터 패밀리 사이트 등)는 제외
      if (link.closest('.swiper-button-wr') || 
          link.closest('.news_slider') || 
          link.closest('.ft-family') || 
          link.closest('.main_visual')) {
        return;
      }
      // 그 외의 순수 '#' 링크만 페이지 이동 방지
      e.preventDefault();
    });
  });

  // Show portfolio notice popup after 0.5s
  setTimeout(showPopup, 500);
});


