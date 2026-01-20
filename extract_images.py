import re
import base64
import os
from pathlib import Path

# 현재 스크립트의 디렉토리
current_dir = Path(__file__).parent

# 1.html 파일 읽기
html_file = current_dir / '1.html'
with open(html_file, 'r', encoding='utf-8') as f:
    html_content = f.read()

# images 폴더 생성
images_dir = current_dir / 'images' / 'extracted'
images_dir.mkdir(parents=True, exist_ok=True)

# base64 이미지 데이터 추출 (xlink:href에 있는 data:image/png;base64,... 형식)
# 정규식으로 base64 데이터 찾기
pattern = r'xlink:href="data:image/png;base64,([^"]+)"'
matches = re.findall(pattern, html_content)

print(f"발견된 이미지 개수: {len(matches)}")

# 각 이미지를 파일로 저장
for idx, base64_data in enumerate(matches):
    try:
        # base64 디코드
        image_data = base64.b64decode(base64_data)
        
        # 파일명 생성
        filename = f'image_{idx + 1:03d}.png'
        filepath = images_dir / filename
        
        # 파일 저장
        with open(filepath, 'wb') as img_file:
            img_file.write(image_data)
        
        print(f"✓ {filename} 저장 완료 ({len(image_data)} bytes)")
    
    except Exception as e:
        print(f"✗ {filename} 저장 실패: {e}")

print(f"\n모든 이미지가 '{images_dir}' 폴더에 저장되었습니다!")
