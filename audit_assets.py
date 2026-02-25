import re
import os

def get_used_assets():
    used_assets = set()
    
    # 1. index.html 분석
    if os.path.exists('index.html'):
        with open('index.html', 'r', encoding='utf-8') as f:
            html_content = f.read()
            # img src 추출 (더 안전한 정규식)
            img_srcs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html_content)
            for src in img_srcs:
                # 쿼리 스트링 제거 (?, #)
                src = src.split('?')[0].split('#')[0]
                used_assets.add(os.path.normpath(src))
            
    # 2. CSS 분석
    css_files = [
        'mental_health_portfolio/css/app.bundle.css',
        'mental_health_portfolio/css/vendor.bundle.css',
        'mental_health_portfolio/css/fonts.bundle.css'
    ]
    
    for css_file in css_files:
        if os.path.exists(css_file):
            with open(css_file, 'r', encoding='utf-8') as f:
                content = f.read()
                # url(...) 추출
                urls = re.findall(r'url\s*\(\s*["\']?([^"\'\)]+)["\']?\s*\)', content)
                css_dir = os.path.dirname(css_file)
                for u in urls:
                    if u.startswith('data:'): continue
                    # 쿼리 스트링 제거
                    u = u.split('?')[0].split('#')[0]
                    # 상대 경로를 루트 기준으로 변환
                    full_path = os.path.normpath(os.path.join(css_dir, u))
                    used_assets.add(full_path)

    return used_assets

def audit_files(used_assets):
    asset_dirs = [
        'mental_health_portfolio/images',
        'mental_health_portfolio/fonts'
    ]
    
    all_files = []
    for d in asset_dirs:
        if not os.path.exists(d): continue
        for root, dirs, files in os.walk(d):
            for file in files:
                all_files.append(os.path.normpath(os.path.join(root, file)))
                
    unused_files = []
    for f in all_files:
        if f not in used_assets:
            unused_files.append(f)
            
    return unused_files

used = get_used_assets()
unused = audit_files(used)

print(f"Total used assets identified: {len(used)}")
print(f"Total unused files found: {len(unused)}")
print("\n--- Top 20 Unused Files ---")
for f in sorted(unused)[:20]:
    print(f)
