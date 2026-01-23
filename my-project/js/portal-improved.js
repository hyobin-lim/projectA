// Footer family menu toggle
    document.addEventListener('DOMContentLoaded', function() {
      const familyLink = document.querySelector('.ft-family > a');
      if (familyLink) {
        familyLink.addEventListener('click', function(e) {
          e.preventDefault();
          document.querySelector('.ft-family').classList.toggle('on');
        });
      }

      // Close family menu when clicking outside
      document.addEventListener('click', function(e) {
        if (!e.target.closest('.ft-family')) {
          document.querySelector('.ft-family').classList.remove('on');
        }
      });
    });

    // 팝업 닫기 함수
function closePopup() {
  const popupOverlay = document.getElementById("popupOverlay");
  popupOverlay.style.display = "none";
}

// 팝업 오버레이 클릭 시 닫기
document.addEventListener('DOMContentLoaded', function() {
  const popupOverlay = document.getElementById("popupOverlay");
  if (popupOverlay) {
    popupOverlay.addEventListener("click", function(e) {
      if (e.target === this) {
        closePopup();
      }
    });
}
});