import re
import os

def precise_rebuild():
    source = 'mental_health_portfolio/index-1.html'
    target = 'index.html'
    
    with open(source, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. 헤드 부분 교체
    bundle_links = '\n    <!-- 포트폴리오 최적화 번들 에셋 연결 -->\n'
    bundle_links += '    <link rel="stylesheet" href="mental_health_portfolio/css/vendor.bundle.css" />\n'
    bundle_links += '    <link rel="stylesheet" href="mental_health_portfolio/css/fonts.bundle.css" />\n'
    bundle_links += '    <link rel="stylesheet" href="mental_health_portfolio/css/app.bundle.css" />\n'
    bundle_links += '    <script src="mental_health_portfolio/js/vendor.bundle.js"></script>\n'
    
    content = content.replace('</head>', bundle_links + '</head>')

    # 2. 인라인 스크립트 분리
    inline_scripts = re.findall(r'<script(?![^>]*src\s*=)[^>]*>(.*?)</script>', content, re.DOTALL)
    combined_js = "/* Portfolio Extracted Scripts */"
    for script in inline_scripts:
        s = script.strip()
        if s: combined_js += "\n(function(){\n" + s + "\n})();\n"
    
    with open('mental_health_portfolio/js/inline_scripts.js', 'w', encoding='utf-8') as f:
        f.write(combined_js)
    
    content = re.sub(r'<script(?![^>]*src\s*=)[^>]*>.*?</script>', '', content, flags=re.DOTALL)
    
    footer_scripts = '\n    <script src="mental_health_portfolio/js/main.bundle.js"></script>\n'
    footer_scripts += '    <script src="mental_health_portfolio/js/inline_scripts.js"></script>\n'
    content = content.replace('</body>', footer_scripts + '</body>')

    # 3. 경로 수정
    def path_fixer(match):
        attr = match.group(1)
        path = match.group(2)
        if path.startswith(('http', 'javascript', 'data:', '#', 'mental_health_portfolio/')):
            return match.group(0)
        return attr + '="mental_health_portfolio/' + path + '"'

    content = re.sub(r'(src|href)="([^"]+)"', path_fixer, content)
    content = content.replace('href="mental_health_portfolio/portal/', 'href="javascript:void(0);')

    with open(target, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("Success: Precise Rebuild.")

if __name__ == "__main__":
    precise_rebuild()
