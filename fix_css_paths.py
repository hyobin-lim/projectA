import os

css_path = 'mental_health_portfolio/css/app.bundle.css'
if os.path.exists(css_path):
    with open(css_path, 'rb') as f:
        content = f.read()
    
    # 1. 절대 경로 수정
    content = content.replace(b'/images/ncmhp/contents/', b'../images/contents/')
    # 2. 잘못된 extracted 경로 수정
    content = content.replace(b'../images/extracted/', b'../images/contents/')
    
    with open(css_path, 'wb') as f:
        f.write(content)
    print("CSS 경로 수복 완료.")
