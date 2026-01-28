import sys

with open(r'first\copy.html', 'rb') as f:
    content = f.read()

try:
    print(content.decode('utf-8'))
except UnicodeDecodeError:
    print(content.decode('cp949'))