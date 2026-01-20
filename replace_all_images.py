import re

# Read 1.html
with open('1.html', 'r', encoding='utf-8') as f:
    html_1 = f.read()

# Read my-project/index.html
with open('my-project/index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

# Extract all images with their labels
pattern = r'data-layer="([^"]+)"[^>]*>.*?<svg[^>]*>.*?<image[^>]*xlink:href="(data:image/png;base64,[^"]+)"'
matches = list(re.finditer(pattern, html_1, re.DOTALL))

print(f"총 {len(matches)}개 이미지 발견")

# Create mapping from label to image data
image_map = {}
for match in matches:
    label = match.group(1)
    image_data = match.group(2)
    if label not in image_map:
        image_map[label] = image_data
        print(f"  - {label}: {len(image_data)} chars")

# Define replacement mapping: image_XXX -> label
replacements = {
    'image_001': '카드뉴스',
    'image_002': '웹툰',
    'image_003': '동영상',
    'image_004': '통계',
    'image_005': '도움이 되는 정보',
    'image_006': '칼럼',
    'image_007': 'FAQ',
    'image_008': '약정보',
    'image_009': '정신건강 정보신청',
    'image_010': '정신건강 복지센터',
    'image_011': '자살예방 센터',
    'image_012': '중독관리 통합지원센터',
    'image_013': '정신요양 시설',
    'image_014': '정신의료 기관',
    'image_015': '기관 지도찾기',
}

count = 0
for image_num, label in replacements.items():
    if label in image_map:
        old_src = f'./images/extracted/{image_num}.png'
        new_src = image_map[label]
        
        if old_src in index_html:
            index_html = index_html.replace(
                f'src="{old_src}"',
                f'src="{new_src}"'
            )
            count += 1
            print(f"✅ {image_num} ← {label}")
        else:
            print(f"❌ {image_num} ({old_src}) - 파일에 없음")
    else:
        print(f"❌ {label} - 1.html에서 찾을 수 없음")

# Write updated HTML
with open('my-project/index.html', 'w', encoding='utf-8') as f:
    f.write(index_html)

print(f"\n총 {count}개 이미지 교체 완료!")
