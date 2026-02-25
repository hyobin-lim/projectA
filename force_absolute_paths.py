import os

# 1. HTML 경로 수정
html_path = 'index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()
# 상대 경로를 루트 상대 경로로 변경
html = html.replace('mental_health_portfolio/images/contents/', '/mental_health_portfolio/images/contents/')
with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

# 2. CSS 경로 수정
css_path = 'mental_health_portfolio/css/app.bundle.css'
with open(css_path, 'rb') as f:
    css = f.read()
# CSS 내의 상대 경로(../images/contents/)를 루트 상대 경로로 변경
css = css.replace(b"url('../images/contents/", b"url('/mental_health_portfolio/images/contents/")
css = css.replace(b'url("../images/contents/', b'url("/mental_health_portfolio/images/contents/')

with open(css_path, 'wb') as f:
    f.write(css)

print("모든 이미지 경로를 루트 상대 경로(/mental_health_portfolio/...)로 변경했습니다.")
