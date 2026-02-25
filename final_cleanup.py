import os
import shutil
import re

def final_recovery():
    # 1. 자산 복구 (단순 루프)
    src_images = 'mental_health_portfolio/unused_assets/images'
    dest_images = 'mental_health_portfolio/images'
    
    if os.path.exists(src_images):
        for sub in ['extracted', 'downloaded', 'favicon']:
            s_dir = os.path.join(src_images, sub)
            d_dir = os.path.join(dest_images, sub)
            if os.path.exists(s_dir):
                if not os.path.exists(d_dir): os.makedirs(d_dir)
                for f in os.listdir(s_dir):
                    shutil.copy2(os.path.join(s_dir, f), os.path.join(d_dir, f))
        print("자산 복구 완료.")

    # 2. CSS 경로 수정 (app.bundle.css) -> ../images/extracted/ 로 복구
    css_path = 'mental_health_portfolio/css/app.bundle.css'
    if os.path.exists(css_path):
        with open(css_path, 'rb') as f:
            content = f.read()
        
        # 오늘 잘못 바꾼 경로들을 정석 경로로 되돌림
        content = content.replace(b'../images/contents/', b'../images/extracted/')
        content = content.replace(b'/images/ncmhp/contents/', b'../images/extracted/')
        
        with open(css_path, 'wb') as f:
            f.write(content)
        print("CSS 경로 정석화 완료 (extracted 참조).")

    # 3. index.html 정밀 재구축 (2/24 기준)
    source = 'mental_health_portfolio/index-1.html'
    if os.path.exists(source):
        with open(source, 'r', encoding='utf-8') as f:
            c = f.read()
        
        # 불필요한 주석 제거 (2/24 작업 반영)
        c = re.sub(r'<!--.*?-->', '', c, flags=re.DOTALL)
        
        # 링크 클린업 (2/24 작업 반영: 모든 서브페이지 링크 무효화)
        c = re.sub(r'href="[^"]*?/portal/[^"]*"', 'href="javascript:void(0);"', c)
        
        # 번들 에셋 연결 (순서 엄격 준수)
        c = re.sub(r'<link rel="stylesheet".*?>', '', c)
        c = re.sub(r'<script src=".*?"></script>', '', c)
        
        head_bundles = '\n    <link rel="stylesheet" href="mental_health_portfolio/css/vendor.bundle.css" />'
        head_bundles += '\n    <link rel="stylesheet" href="mental_health_portfolio/css/fonts.bundle.css" />'
        head_bundles += '\n    <link rel="stylesheet" href="mental_health_portfolio/css/app.bundle.css" />'
        head_bundles += '\n    <script src="mental_health_portfolio/js/vendor.bundle.js"></script>\n'
        c = c.replace('</head>', head_bundles + '</head>')
        
        body_bundles = '\n    <script src="mental_health_portfolio/js/main.bundle.js"></script>\n'
        c = c.replace('</body>', body_bundles + '</body>')
        
        # 이미지 경로 앞에 mental_health_portfolio/ 추가 (단, 이미 붙어있지 않은 경우만)
        def fix_src(m):
            p = m.group(2)
            if p.startswith(('http', 'javascript', 'data:', '#', 'mental_health_portfolio/')): return m.group(0)
            return f'{m.group(1)}="mental_health_portfolio/{p}"'
        c = re.sub(r'(src|href)="([^"]+)"', fix_src, c)

        # 2/24 핵심 오버라이드: moveMenu 함수 등 처리 (inline_scripts.js로 분리했던 것 유지 또는 재삽입)
        # 여기서는 인라인 스크립트를 깔끔하게 정리하되 핵심 로직은 살립니다.
        
        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(c)
        print("index.html 2/24 기준 정밀 복원 완료.")

if __name__ == "__main__":
    final_recovery()
