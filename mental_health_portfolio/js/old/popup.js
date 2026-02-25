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
