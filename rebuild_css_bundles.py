import os

# 경로 설정
css_old_dir = 'mental_health_portfolio/css/old'
output_dir = 'mental_health_portfolio/css'

# 번들링 구성 정의
bundles = {
    'fonts.bundle.css': [
        'pretendard.css',
        'SCoreDream-font-face.css',
        'SCoreDream-font-family.css'
    ],
    'vendor.bundle.css': [
        'xeicon.min.css',
        'swiper.min.css',
        'aos.css',
        'jqueryui.css'
    ],
    'app.bundle.css': [
        'portal_reset.css',
        'portal_layout.css',
        'portal_contents.css',
        'popup.css',
        'inline_styles.css'
    ]
}

def rebuild_bundles():
    for bundle_name, files in bundles.items():
        combined_content = '@charset "utf-8";\n\n'
        print(f"Creating {bundle_name}...")
        
        for file_name in files:
            file_path = os.path.join(css_old_dir, file_name)
            if not os.path.exists(file_path):
                print(f"  [Warning] File not found: {file_path}")
                continue
            
            print(f"  Adding {file_name}...")
            with open(file_path, 'rb') as f:
                content = f.read().decode('utf-8', errors='ignore')
            
            # 중복 charset 제거
            content = content.replace('@charset "utf-8";', '')
            content = content.replace('@charset "UTF-8";', '')
            
            # 경로 교정: ../../ (old 기준) -> ../ (css 기준)
            content = content.replace('../../images/', '../images/')
            content = content.replace('../../fonts/', '../fonts/')
            
            combined_content += f"/* Source: {file_name} */\n"
            combined_content += content + "\n\n"
        
        output_path = os.path.join(output_dir, bundle_name)
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(combined_content)
        print(f"Successfully saved {bundle_name}\n")

if __name__ == "__main__":
    rebuild_bundles()
