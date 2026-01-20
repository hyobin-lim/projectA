import re

# Read 1.html
with open('1.html', 'r', encoding='utf-8') as f:
    html_1 = f.read()

# Read my-project/index.html
with open('my-project/index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

# Extract "도움이 되는 정보" image from 1.html
# Looking for data-layer containing exact text
pattern = r'data-layer="도움이 되는 정보".*?xlink:href="(data:image/png;base64,[^"]+)"'
match = re.search(pattern, html_1, re.DOTALL)

if match:
    image_data = match.group(1)
    print(f"Found '도움이 되는 정보' image: {len(image_data)} characters")
    
    # Replace image_005.png with data URI
    old_src = './images/extracted/image_005.png'
    new_src = image_data
    
    # Use a more specific pattern to match only image_005
    index_html_updated = re.sub(
        r'src="' + re.escape(old_src) + r'"',
        f'src="{new_src}"',
        index_html
    )
    
    # Write back to file
    with open('my-project/index.html', 'w', encoding='utf-8') as f:
        f.write(index_html_updated)
    
    print("✅ image_005 교체 완료!")
else:
    print("❌ '도움이 되는 정보' 이미지를 찾을 수 없습니다")
