import os

# 1. CSS 경로 수정 (Binary Safe)
css_path = 'mental_health_portfolio/css/app.bundle.css'
if os.path.exists(css_path):
    print("--- CSS 경로 수정 시작 (Binary Mode) ---")
    with open(css_path, 'rb') as f:
        content = f.read()
    
    old_path = b'/images/ncmhp/contents/'
    new_path = b'../images/contents/'
    
    if old_path in content:
        new_content = content.replace(old_path, new_path)
        with open(css_path, 'wb') as f:
            f.write(new_content)
        print("CSS 내 경로 변환 완료.")
    else:
        print("CSS 내에 변환할 절대 경로가 없습니다.")

# 2. index.html 복구 시도
html_path = 'index.html'
if os.path.exists(html_path):
    print("\n--- index.html 인코딩 복구 시도 ---")
    encodings = ['utf-8', 'euc-kr', 'cp949', 'utf-16']
    success = False
    for enc in encodings:
        try:
            with open(html_path, 'r', encoding=enc) as f:
                content = f.read()
            # 만약 읽어온 내용에 깨진 문자가 너무 많으면 실패로 간주 (간단한 체크)
            if content.count('') > 50:
                continue
                
            with open(html_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"성공: {enc}로 읽어 UTF-8로 저장함")
            success = True
            break
        except:
            continue
            
    if not success:
        print("index.html 복구 실패. 원본 index-1.html에서 내용을 다시 구성해야 할 수 있습니다.")
