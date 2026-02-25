import os

def final_fix():
    css_dir = 'mental_health_portfolio/css/old'
    for filename in os.listdir(css_dir):
        if filename.endswith('.css'):
            path = os.path.join(css_dir, filename)
            with open(path, 'rb') as f:
                c = f.read()
            
            # 잘못 쌓인 ../들을 모두 제거하고 정석 경로로 치환
            # 여러 번 중첩된 것들을 하나씩 처리합니다.
            for _ in range(5):
                c = c.replace(b'../../../', b'../../')
            
            # 절대 경로 슬래시 제거
            c = c.replace(b"url('/images/contents/", b"url('../../images/contents/")
            c = c.replace(b"url('/fonts/", b"url('../../fonts/")
            
            with open(path, 'wb') as f:
                f.write(c)
            print(f"Fixed: {filename}")

if __name__ == "__main__":
    final_fix()
