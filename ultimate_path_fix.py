import os

def fix_paths():
    css_dir = 'mental_health_portfolio/css/old'
    for filename in os.listdir(css_dir):
        if filename.endswith('.css'):
            path = os.path.join(css_dir, filename)
            with open(path, 'rb') as f:
                c = f.read()
            
            # 이미지 경로 수복
            c = c.replace(b"'/images/ncmhp/contents/", b"'../../images/contents/")
            c = c.replace(b'"/images/ncmhp/contents/', b'"../../images/contents/')
            c = c.replace(b"(/images/ncmhp/contents/", b"(../../images/contents/")
            c = c.replace(b"../images/extracted/", b"../../images/contents/")
            c = c.replace(b"../images/contents/", b"../../images/contents/")
            c = c.replace(b"images/downloaded/", b"../../images/contents/")
            
            # 폰트 경로 수복
            c = c.replace(b"../fonts/", b"../../fonts/")
            c = c.replace(b"'fonts/", b"'../../fonts/")
            c = c.replace(b'"fonts/', b'"../../fonts/')
            c = c.replace(b"(fonts/", b"(../../fonts/")

            with open(path, 'wb') as f:
                f.write(c)
            print(f"Fixed: {filename}")

    # index.html
    html_path = 'index.html'
    with open(html_path, 'r', encoding='utf-8') as f:
        h = f.read()
    h = h.replace('="/mental_health_portfolio/', '="mental_health_portfolio/')
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(h)
    print("Fixed: index.html")

if __name__ == "__main__":
    fix_paths()
