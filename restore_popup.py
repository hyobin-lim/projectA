import os

def final_popup_restore():
    html_path = 'index.html'
    inline_js = 'mental_health_portfolio/js/inline_scripts.js'
    
    # 1. 팝업 마크업 (index.html </body> 직전)
    popup_html = '\n<!-- 포트폴리오 안내 팝업 -->\n'
    popup_html += '<div id="popupOverlay" class="popup-overlay hidden">\n'
    popup_html += '  <div class="popup-card">\n'
    popup_html += '    <div class="popup-header">\n'
    popup_html += '      <div class="popup-title"><span>ⓘ</span> <span>포트폴리오 안내</span></div>\n'
    popup_html += '      <button class="popup-close-icon" title="닫기">&times;</button>\n'
    popup_html += '    </div>\n'
    popup_html += '    <div class="popup-body">\n'
    popup_html += '      본 웹사이트는 <strong>정신건강정보포털</strong> 사이트를 기반으로 제작된 개인 포트폴리오용 결과물입니다.<br><br>\n'
    popup_html += '      모든 에셋(CSS, JS, 이미지, 폰트)을 로컬 상대 경로로 최적화하여 구현하였으며, 원본 사이트의 디자인과 기능을 충실히 재현하였습니다.\n'
    popup_html += '    </div>\n'
    popup_html += '    <div class="popup-footer"><button class="popup-confirm-btn">확인</button></div>\n'
    popup_html += '  </div>\n</div>\n'

    if os.path.exists(html_path):
        with open(html_path, 'r', encoding='utf-8') as f:
            content = f.read()
        if '</body>' in content and 'popupOverlay' not in content:
            new_content = content.replace('</body>', popup_html + '</body>')
            with open(html_path, 'w', encoding='utf-8') as f:
                f.write(new_content)

    # 2. 팝업 로직 (inline_scripts.js 에 추가)
    if os.path.exists(inline_js):
        with open(inline_js, 'a', encoding='utf-8') as f:
            f.write("\n\n/* Portfolio Popup Logic */\n")
            f.write("function showPopup() { const o = document.getElementById('popupOverlay'); if(o) o.classList.remove('hidden'); }\n")
            f.write("function closePopup() { const o = document.getElementById('popupOverlay'); if(o) o.classList.add('hidden'); }\n")
            f.write("window.addEventListener('DOMContentLoaded', () => {\n")
            f.write("  const c = document.querySelector('.popup-close-icon'); if(c) c.addEventListener('click', closePopup);\n")
            f.write("  const b = document.querySelector('.popup-confirm-btn'); if(b) b.addEventListener('click', closePopup);\n")
            f.write("  setTimeout(showPopup, 500);\n")
            f.write("});\n")
    
    print("Success: Final Restoration.")

if __name__ == "__main__":
    final_popup_restore()
