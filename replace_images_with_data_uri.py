import re
import base64

# 1.html 읽기
with open('1.html', 'r', encoding='utf-8') as f:
    html_1 = f.read()

# my-project/index.html 읽기
with open('my-project/index.html', 'r', encoding='utf-8') as f:
    html_my_project = f.read()

# 1.html에서 모든 base64 이미지와 data-layer 라벨 추출
image_pattern = r'data-layer="([^"]+)"[^>]*>.*?<svg[^>]*>.*?<image[^>]*xlink:href="(data:image/png;base64,[^"]+)"'
matches = re.finditer(image_pattern, html_1, re.DOTALL)

images_by_label = {}
for match in matches:
    label = match.group(1)
    data_uri = match.group(2)
    if label not in images_by_label:
        images_by_label[label] = data_uri
        print(f"추출됨: {label} - {len(data_uri)} 문자")

# 메인 카테고리 이미지 매핑
main_categories = {
    '카드뉴스': 'image_001',
    '웹툰': 'image_002',
    '동영상': 'image_003',
    '통계': 'image_004',
    '도움이 되는 정보': 'image_005',
    '칼럼': 'image_006',
    'FAQ': 'image_007',
    '약정보': 'image_008'
}

# 기관 아이콘 매핑 (main_sec04_icon01.png ~ 07.png)
facility_icons = {
    'main_sec04_icon01.png': 'image_009',
    'main_sec04_icon02.png': 'image_010',
    'main_sec04_icon03.png': 'image_011',
    'main_sec04_icon04.png': 'image_012',
    'main_sec04_icon05.png': 'image_013',
    'main_sec04_icon06.png': 'image_014',
    'main_sec04_icon07.png': 'image_015'
}

print("\n=== 이미지 매핑 생성 ===")
print(f"메인 카테고리: {len(main_categories)}개")
print(f"기관 아이콘: {len(facility_icons)}개")

# my-project/index.html에서 image_xxx를 찾아서 data URI로 변경
replacements = []

for label, local_img in main_categories.items():
    if label in images_by_label:
        data_uri = images_by_label[label]
        # local_img를 data URI로 변경
        old = f'./images/extracted/{local_img}.png'
        new = data_uri
        replacements.append((old, new))
        print(f"교체 준비: {local_img} -> {label}")

for icon_file, local_img in facility_icons.items():
    if icon_file in images_by_label:
        data_uri = images_by_label[icon_file]
        old = f'./images/extracted/{local_img}.png'
        new = data_uri
        replacements.append((old, new))
        print(f"교체 준비: {local_img} -> {icon_file}")

# 교체 실행
result = html_my_project
for old, new in replacements:
    result = result.replace(f'src="{old}"', f'src="{new}"')

# 변경된 my-project/index.html 저장
with open('my-project/index.html', 'w', encoding='utf-8') as f:
    f.write(result)

print(f"\n✅ my-project/index.html 업데이트 완료!")
print(f"총 {len(replacements)}개 이미지 교체됨")
