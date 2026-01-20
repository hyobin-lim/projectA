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
        print(f"  - {label}")

# Find remaining relative image paths
remaining_images = re.findall(r'src="(\./images/extracted/image_\d+\.png)"', index_html)
remaining_images = sorted(set(remaining_images))

print(f"\n남은 이미지 (상대경로): {len(remaining_images)}개")
for img in remaining_images:
    print(f"  - {img}")

# Check what's still in 1.html but not yet replaced
print(f"\n1.html에서 찾은 라벨들:")
for label in sorted(image_map.keys()):
    if label and not label.startswith('0bfb'):  # Skip technical labels
        print(f"  - {label}")
