import os
import shutil

# 1. 필수 이미지 복구
source_dirs = [
    'mental_health_portfolio/unused_assets/images/extracted',
    'mental_health_portfolio/unused_assets/images/downloaded'
]
target_dir = 'mental_health_portfolio/images/contents'

if not os.path.exists(target_dir):
    os.makedirs(target_dir)

print("--- 이미지 복구 시작 ---")
for s_dir in source_dirs:
    if os.path.exists(s_dir):
        for filename in os.listdir(s_dir):
            src_path = os.path.join(s_dir, filename)
            dest_path = os.path.join(target_dir, filename)
            if os.path.isfile(src_path):
                if not os.path.exists(dest_path):
                    shutil.copy2(src_path, dest_path)
                    print(f"복구됨: {filename}")
                else:
                    print(f"이미 존재함: {filename}")

# 2. CSS 경로 수정 (app.bundle.css)
css_path = 'mental_health_portfolio/css/app.bundle.css'
if os.path.exists(css_path):
    print("\n--- CSS 경로 수정 시작 ---")
    with open(css_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 절대 경로를 상대 경로로 변환
    old_path = '/images/ncmhp/contents/'
    new_path = '../images/contents/'
    
    if old_path in content:
        new_content = content.replace(old_path, new_path)
        with open(css_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"CSS 내 경로 변환 완료: {old_path} -> {new_path}")
    else:
        print("CSS 내에 변환할 절대 경로가 없습니다.")

print("\n--- 작업 완료 ---")
