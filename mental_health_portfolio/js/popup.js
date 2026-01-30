function closePopup() {
  document.getElementById('popupOverlay').style.display = 'none';
}
// Display popup on page load
window.onload = function() {
  document.getElementById('popupOverlay').style.display = 'flex';
};