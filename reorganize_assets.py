import os
import shutil
import re

def get_used_assets():
    used_assets = set()
    if os.path.exists('index.html'):
        with open('index.html', 'r', encoding='utf-8') as f:
            html_content = f.read()
            img_srcs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html_content)
            for src in img_srcs:
                src = src.split('?')[0].split('#')[0]
                used_assets.add(os.path.normpath(src))
            
    css_files = [
        'mental_health_portfolio/css/app.bundle.css',
        'mental_health_portfolio/css/vendor.bundle.css',
        'mental_health_portfolio/css/fonts.bundle.css'
    ]
    
    for css_file in css_files:
        if os.path.exists(css_file):
            with open(css_file, 'r', encoding='utf-8') as f:
                content = f.read()
                urls = re.findall(r'url\s*\(\s*["\']?([^"\'\)]+)["\']?\s*\)', content)
                css_dir = os.path.dirname(css_file)
                for u in urls:
                    if u.startswith('data:'): continue
                    u = u.split('?')[0].split('#')[0]
                    full_path = os.path.normpath(os.path.join(css_dir, u))
                    used_assets.add(full_path)
    return used_assets

def move_unused_assets():
    used_assets = get_used_assets()
    target_dir = 'mental_health_portfolio/unused_assets'
    
    if not os.path.exists(target_dir):
        os.makedirs(target_dir)

    asset_dirs = ['mental_health_portfolio/images', 'mental_health_portfolio/fonts']
    moved_count = 0

    for d in asset_dirs:
        if not os.path.exists(d): continue
        for root, dirs, files in os.walk(d):
            if 'unused_assets' in root: continue # 무한 루프 방지
            for file in files:
                full_path = os.path.normpath(os.path.join(root, file))
                if full_path not in used_assets:
                    # 상대 경로 보존하여 이동
                    rel_path = os.path.relpath(full_path, 'mental_health_portfolio')
                    new_path = os.path.join(target_dir, rel_path)
                    
                    new_dir = os.path.dirname(new_path)
                    if not os.path.exists(new_dir):
                        os.makedirs(new_dir)
                    
                    try:
                        shutil.move(full_path, new_path)
                        moved_count += 1
                    except Exception as e:
                        print(f"Error moving {full_path}: {e}")

    print(f"Moved {moved_count} unused assets to {target_dir}")

move_unused_assets()
