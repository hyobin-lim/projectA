import os

html_path = 'index.html'
if os.path.exists(html_path):
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # CSS 번들 제거 및 개별 파일 연결 (old 폴더 참조)
    css_bundle_section = """    <link rel="stylesheet" href="mental_health_portfolio/css/vendor.bundle.css" />
    <link rel="stylesheet" href="mental_health_portfolio/css/fonts.bundle.css" />
    <link rel="stylesheet" href="mental_health_portfolio/css/app.bundle.css" />"""
    
    css_individual = """    <link rel="stylesheet" href="mental_health_portfolio/css/old/portal_reset.css" />
    <link rel="stylesheet" href="mental_health_portfolio/css/old/portal_layout.css" />
    <link rel="stylesheet" href="mental_health_portfolio/css/old/portal_contents.css" />
    <link rel="stylesheet" href="mental_health_portfolio/css/old/xeicon.min.css" />
    <link rel="stylesheet" href="mental_health_portfolio/css/old/swiper.min.css" />
    <link rel="stylesheet" href="mental_health_portfolio/css/old/aos.css" />
    <link rel="stylesheet" href="mental_health_portfolio/css/old/jqueryui.css" />
    <link rel="stylesheet" href="mental_health_portfolio/css/old/popup.css" />
    <link rel="stylesheet" href="mental_health_portfolio/css/old/pretendard.css" />
    <link rel="stylesheet" href="mental_health_portfolio/css/old/SCoreDream-font-face.css" />
    <link rel="stylesheet" href="mental_health_portfolio/css/old/SCoreDream-font-family.css" />"""

    content = content.replace(css_bundle_section, css_individual)

    # JS 번들 제거 및 개별 파일 연결 (old 폴더 참조)
    js_bundle_section = """    <script src="mental_health_portfolio/js/vendor.bundle.js"></script>
    <script src="mental_health_portfolio/js/main.bundle.js"></script>"""

    js_individual = """    <script src="mental_health_portfolio/js/old/jquery.min.js"></script>
    <script src="mental_health_portfolio/js/old/jquery-ui.min.js"></script>
    <script src="mental_health_portfolio/js/old/slick.min.js"></script>
    <script src="mental_health_portfolio/js/old/swiper.min.js"></script>
    <script src="mental_health_portfolio/js/old/aos.js"></script>
    <script src="mental_health_portfolio/js/old/common.js"></script>
    <script src="mental_health_portfolio/js/old/portal_contents.js"></script>
    <script src="mental_health_portfolio/js/old/main.js"></script>
    <script src="mental_health_portfolio/js/old/popup.js"></script>"""

    content = content.replace(js_bundle_section, js_individual)

    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("번들 해제 및 개별 파일 연결(old) 완료.")
