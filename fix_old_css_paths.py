import os

css_dir = 'mental_health_portfolio/css/old'
if os.path.exists(css_dir):
    for filename in os.listdir(css_dir):
        if filename.endswith('.css'):
            path = os.path.join(css_dir, filename)
            with open(path, 'rb') as f:
                content = f.read()
            
            # 절대 경로 및 잘못된 경로를 ../../images/contents/ 로 수정 
            # (css/old 폴더에 있으므로 상위로 두 번 올라가야 함)
            new_content = content.replace(b'/images/ncmhp/contents/', b'../../images/contents/')
            new_content = new_content.replace(b'../images/extracted/', b'../../images/contents/')
            new_content = new_content.replace(b'../images/contents/', b'../../images/contents/')
            
            if new_content != content:
                with open(path, 'wb') as f:
                    f.write(new_content)
                print(f"수정됨: {filename}")
