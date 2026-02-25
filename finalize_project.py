import os
import re

def finalize_everything():
    # 1. CSS 번들 경로 수정 (app.bundle.css)
    css_path = 'mental_health_portfolio/css/app.bundle.css'
    if os.path.exists(css_path):
        with open(css_path, 'rb') as f:
            c = f.read()
        
        # 모든 이미지 관련 경로를 ../images/contents/ 로 강제 고정 (번들 위치 기준)
        c = re.sub(b'url\(["']?.*?images/contents/([^"'\)]+)["']?\)', b"url('../images/contents/\1')", c)
        c = re.sub(b'url\(["']?.*?fonts/([^"'\)]+)["']?\)', b"url('../fonts/\1')", c)
        
        with open(css_path, 'wb') as f:
            f.write(c)
        print("app.bundle.css 경로 수정 완료.")

    # 2. index.html 링크 교체 (개별 -> 번들)
    html_path = 'index.html'
    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # CSS 교체
    old_css = r'<link rel="stylesheet" href="mental_health_portfolio/css/old/portal_reset\.css" />.*?<link rel="stylesheet" href="mental_health_portfolio/css/old/SCoreDream-font-family\.css" />'
    new_css = """<link rel="stylesheet" href="mental_health_portfolio/css/vendor.bundle.css" />
    <link rel="stylesheet" href="mental_health_portfolio/css/fonts.bundle.css" />
    <link rel="stylesheet" href="mental_health_portfolio/css/app.bundle.css" />"""
    html = re.sub(old_css, new_css, html, flags=re.DOTALL)

    # JS 교체
    old_js = r'<script src="mental_health_portfolio/js/old/jquery\.min\.js"></script>.*?<script src="mental_health_portfolio/js/old/popup\.js"></script>'
    new_js = """<script src="mental_health_portfolio/js/vendor.bundle.js"></script>
    <script src="mental_health_portfolio/js/main.bundle.js"></script>"""
    html = re.sub(old_js, new_js, html, flags=re.DOTALL)

    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("index.html 번들 적용 완료.")

if __name__ == "__main__":
    finalize_everything()
