import os

def optimize_index():
    file_path = "index.html"
    if not os.path.exists(file_path):
        return

    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. 인라인 스타일 제거
    content = content.replace(' style="left: 0px"', '')

    # 2. 버튼 타입 최적화
    content = content.replace('type="submit" id="searchBtnTop"', 'type="button" id="searchBtnTop"')
    content = content.replace('type="submit" id="searchBtn"', 'type="button" id="searchBtn"')

    # 3. 접근성 향상 (alt 속성)
    if 'alt="웹 접근성' not in content:
        content = content.replace('WA_img_20250814.png" />', 'WA_img_20250814.png" alt="웹 접근성 품질인증 마크" />')
    
    # 4. GNB 메뉴 사이의 넓은 공백 줄이기 (단순 replace)
    content = content.replace('</li>\n\n                <li', '</li>\n                <li')
    content = content.replace('</li>\n\n\n                <li', '</li>\n                <li')

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Successfully optimized index.html")

if __name__ == "__main__":
    optimize_index()
