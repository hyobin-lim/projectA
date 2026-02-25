import re
import os

def clean_css(file_path, is_font_bundle=False):
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. @charset 정리 (중복 제거)
    content = re.sub(r'@charset\s+["\']utf-8["\'];', '', content, flags=re.IGNORECASE)
    
    if not is_font_bundle:
        # app.bundle.css에서 @font-face 블록 제거 (이미 fonts.bundle.css에 있으므로)
        # 보다 견고한 정규식: 중첩된 중괄호가 없다고 가정
        content = re.sub(r'@font-face\s*\{[^\}]*\}', '', content, flags=re.DOTALL)
        
    # 2. 불필요한 공백 정리
    content = re.sub(r'\n\s*\n', '\n\n', content)
    
    # 최상단에 @charset 추가
    final_content = '@charset "utf-8";\n\n' + content.strip()
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(final_content)
    print(f"Successfully optimized: {file_path}")

# 경로 설정
fonts_bundle = 'mental_health_portfolio/css/fonts.bundle.css'
app_bundle = 'mental_health_portfolio/css/app.bundle.css'

# 작업 실행
clean_css(fonts_bundle, is_font_bundle=True)
clean_css(app_bundle, is_font_bundle=False)
