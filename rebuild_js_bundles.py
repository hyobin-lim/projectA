import os

js_old_dir = 'mental_health_portfolio/js/old'
output_dir = 'mental_health_portfolio/js'

# JS 3대 번들링 구성 (모든 소스는 old/ 폴더에 있음)
bundles = {
    'vendor.bundle.js': [
        'jquery.min.js',
        'jquery-ui.min.js',
        'slick.min.js',
        'swiper.min.js',
        'aos.js'
    ],
    'main.bundle.js': [
        'common.js',
        'portal_contents.js',
        'main.js'
    ],
    'app.bundle.js': [
        'popup.js',
        'inline_scripts.js' # 이제 같은 old 폴더에 있음
    ]
}

def rebuild_js_bundles():
    for bundle_name, files in bundles.items():
        combined_content = ""
        print(f"Creating {bundle_name}...")
        for file_name in files:
            file_path = os.path.join(js_old_dir, file_name)
            
            if not os.path.exists(file_path):
                print(f"  [Warning] File not found: {file_path}")
                continue
                
            with open(file_path, 'rb') as f:
                content = f.read().decode('utf-8', errors='ignore')
            
            combined_content += "/* Source: " + file_name + " */\n"
            combined_content += content + "\n\n"
            
        output_path = os.path.join(output_dir, bundle_name)
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(combined_content)
        print("Successfully saved " + bundle_name)

if __name__ == "__main__":
    rebuild_js_bundles()
