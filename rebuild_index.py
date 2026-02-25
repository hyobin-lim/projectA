import re
import os

def rebuild_index():
    source_path = 'mental_health_portfolio/index-1.html'
    target_path = 'index.html'
    
    if not os.path.exists(source_path):
        print(f"Error: {source_path} not found.")
        return

    with open(source_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. CSS 연결 수정
    content = re.sub(r'<link rel="stylesheet".*?>', '', content)
    
    # 2. JS 연결 수정 (기존 script src 제거)
    content = re.sub(r'<script src=".*?"></script>', '', content)
    
    # 3. 에셋 연결 (vendor.bundle.js는 head로, 나머지는 원래대로)
    # CSS 번들
    bundle_styles = '\n    <link rel="stylesheet" href="mental_health_portfolio/css/vendor.bundle.css" />'
    bundle_styles += '\n    <link rel="stylesheet" href="mental_health_portfolio/css/fonts.bundle.css" />'
    bundle_styles += '\n    <link rel="stylesheet" href="mental_health_portfolio/css/app.bundle.css" />'
    
    # jQuery가 포함된 vendor.bundle.js를 head에 추가 (인라인 스크립트 실행 전 로드 필요)
    bundle_styles += '\n    <script src="mental_health_portfolio/js/vendor.bundle.js"></script>\n'
    
    content = content.replace('</head>', bundle_styles + '</head>')

    # 서비스 로직인 main.bundle.js는 body 하단에 추가
    bundle_scripts = '\n    <script src="mental_health_portfolio/js/main.bundle.js"></script>\n'
    content = content.replace('</body>', bundle_scripts + '</body>')

    # 4. 에셋 경로 접두어 추가
    def add_prefix(match):
        attr = match.group(1)
        path = match.group(2)
        if path.startswith(('http', 'javascript', 'data:', '#', 'mental_health_portfolio/')):
            return match.group(0)
        return f'{attr}="mental_health_portfolio/{path}"'

    content = re.sub(r'(src|href)="([^"]+)"', add_prefix, content)

    # 5. 내부 링크 무효화 (상세 경로 포함)
    content = content.replace('href="mental_health_portfolio/portal/', 'href="javascript:void(0);')

    # 6. UTF-8로 저장
    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("Success: index.html has been rebuilt. jQuery (vendor.bundle.js) is now in the <head>.")

if __name__ == "__main__":
    rebuild_index()
