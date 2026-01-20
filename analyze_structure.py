import re
from pathlib import Path

# 1.html 읽기
with open('1.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# 모든 SVG 이미지를 추출 (data-layer 속성과 함께)
# SVG 블록 전체를 추출
svg_pattern = r'<div data-svg-wrapper data-layer="([^"]+)"[^>]*>.*?<svg[^>]*>.*?</svg>.*?</div>'
svg_matches = list(re.finditer(svg_pattern, html_content, re.DOTALL))

print(f"발견된 SVG: {len(svg_matches)}개")

# 각 SVG의 label과 전체 SVG 코드를 저장
svg_list = []
for i, match in enumerate(svg_matches, 1):
    label = match.group(1)
    svg_code = match.group(0)
    svg_list.append({
        'index': i,
        'label': label,
        'svg': svg_code
    })
    print(f"SVG #{i}: {label}")

# 섹션 분석: 1.html은 3개 섹션이 있음 (각각 반복된 이미지)
print("\n=== 섹션 분석 ===")
print(f"SVG #1-15 (섹션 1): {[s['label'] for s in svg_list[0:15]]}")
print(f"SVG #16-30 (섹션 2): {[s['label'] for s in svg_list[15:30]]}")
print(f"SVG #31-45 (섹션 3): {[s['label'] for s in svg_list[30:45]]}")

# 가장 먼저 나오는 8개의 메인 카테고리 아이콘 찾기 (카드뉴스, 웹툰, 동영상, 통계, 도움정보, 칼럼, FAQ, 약정보)
main_icons = {}
for svg in svg_list[:8]:
    main_icons[svg['label']] = svg['svg']
    
print(f"\n메인 카테고리 아이콘: {list(main_icons.keys())}")

# my-project/index.html과 구조 비교
with open('my-project/index.html', 'r', encoding='utf-8') as f:
    my_project = f.read()

# my-project에서 이미지가 들어가는 위치 찾기
img_positions = re.finditer(r'<img src="./images/extracted/image_(\d+)\.png"[^>]*>', my_project)
img_list = list(img_positions)
print(f"\nmy-project에서 발견된 img 태그: {len(img_list)}개")

# 각 위치에서 context를 보기
for i, match in enumerate(img_list[:5], 1):
    line_start = max(0, match.start() - 100)
    line_end = min(len(my_project), match.end() + 100)
    context = my_project[line_start:line_end]
    print(f"\nimg #{i}: {match.group(1)}")
    print(f"Context: ...{context}...")
