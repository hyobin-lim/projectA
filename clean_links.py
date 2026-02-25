import re
import os

def clean_html_links():
    if not os.path.exists('index.html'):
        return

    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. /portal/ 로 시작하는 모든 링크를 javascript:void(0); 로 변경
    # 단, 메인으로 오는 링크나 특별한 처리가 필요한 것은 제외할 수 있음
    pattern = r'href="/portal/[^"]+"'
    content = re.sub(pattern, 'href="javascript:void(0);"', content)

    # 2. index.html 링크는 상대 경로 ./index.html 로 통일
    content = re.sub(r'href="/portal/main/index\.do"', 'href="./index.html"', content)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("HTML links cleaned.")

clean_html_links()
