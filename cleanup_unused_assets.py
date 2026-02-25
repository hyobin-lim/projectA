
import os
import re

def get_used_assets():
    used_files = set()
    
    # 1. index.html 분석
    if os.path.exists("index.html"):
        with open("index.html", "r", encoding="utf-8") as f:
            content = f.read()
            # src, href 추출
            found = re.findall(r'(?:src|href)=["'/]+([^"'\s>\?]+)', content)
            for path in found:
                name = os.path.basename(path)
                if name: used_files.add(name)

    # 2. app.bundle.css 분석
    css_path = "mental_health_portfolio/css/app.bundle.css"
    if os.path.exists(css_path):
        with open(css_path, "r", encoding="utf-8") as f:
            content = f.read()
            # url() 추출
            found = re.findall(r'url\s*\(\s*["'/]*([^"'\)\s>\?]+)', content)
            for path in found:
                name = os.path.basename(path)
                if name: used_files.add(name)
                
    return used_files

def cleanup_assets():
    used = get_used_assets()
    print(f"Total used assets identified: {len(used)}")
    
    targets = [
        "mental_health_portfolio/images/extracted/",
        "mental_health_portfolio/images/downloaded/"
    ]
    
    removed_count = 0
    for target_dir in targets:
        if not os.path.exists(target_dir): continue
        
        for file_name in os.listdir(target_dir):
            if os.path.isfile(os.path.join(target_dir, file_name)):
                if file_name not in used:
                    # 메인 페이지에서 사용되지 않는 파일 삭제
                    os.remove(os.path.join(target_dir, file_name))
                    removed_count += 1
                    print(f"Removed unused asset: {file_name}")

    print(f"
Cleanup complete. Total removed assets: {removed_count}")

if __name__ == "__main__":
    cleanup_assets()
