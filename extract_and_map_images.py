import re
import base64
import os
from pathlib import Path
from PIL import Image
import io

# 1.html 읽기
with open('1.html', 'r', encoding='utf-8') as f:
    content = f.read()

# SVG 내의 모든 base64 이미지 추출
# xlink:href="data:image/png;base64,......" 패턴
pattern = r'xlink:href="data:image/png;base64,([^"]+)"'
matches = re.findall(pattern, content)

print(f"발견된 base64 이미지: {len(matches)}개")

# 각 base64를 디코딩해서 바이너리로 변환
base64_images = []
for i, base64_str in enumerate(matches, 1):
    try:
        # base64 디코딩
        image_data = base64.b64decode(base64_str)
        base64_images.append((i, image_data))
        print(f"이미지 {i}: {len(image_data)} 바이트")
    except Exception as e:
        print(f"이미지 {i} 디코딩 실패: {e}")

# 추출된 이미지들의 해시 계산
extracted_dir = Path('my-project/images/extracted')
extracted_images = {}

for img_file in sorted(extracted_dir.glob('image_*.png')):
    with open(img_file, 'rb') as f:
        image_data = f.read()
        extracted_images[img_file.name] = image_data
        print(f"{img_file.name}: {len(image_data)} 바이트")

print(f"\n추출된 이미지 폴더의 이미지: {len(extracted_images)}개")

# 매핑 생성: base64 이미지와 추출된 이미지 비교
mapping = {}
for idx, base64_data in base64_images:
    for filename, extracted_data in extracted_images.items():
        if base64_data == extracted_data:
            mapping[idx] = filename
            print(f"매핑 찾음: SVG #{idx} = {filename}")
            break

print("\n최종 매핑:")
for svg_idx in sorted(mapping.keys()):
    print(f"  SVG 이미지 {svg_idx} -> {mapping[svg_idx]}")

# my-project/index.html의 이미지 src 업데이트
# 현재 구조: image_001, image_002, ..., image_036
# 이들을 정확한 매핑으로 변경
print("\n매핑 결과:")
print(f"총 {len(mapping)}개 이미지 매핑됨")
if len(mapping) < len(base64_images):
    print(f"경고: {len(base64_images) - len(mapping)}개 이미지가 매핑되지 않음")
