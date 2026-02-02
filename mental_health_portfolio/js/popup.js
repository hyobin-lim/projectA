// 포트폴리오 고지 팝업을 표시하는 함수
function showPopup() {
  const overlay = document.getElementById("popupOverlay");
  overlay.classList.remove('hidden');
}

// 포트폴리오 고지 팝업을 닫는 함수
function closePopup() {
  const overlay = document.getElementById("popupOverlay");
  overlay.classList.add('hidden');
}

