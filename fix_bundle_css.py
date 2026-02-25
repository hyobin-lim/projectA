import os

def fix_app_bundle():
    path = 'mental_health_portfolio/css/app.bundle.css'
    if os.path.exists(path):
        with open(path, 'rb') as f:
            c = f.read()
        
        # 1. 절대 경로 -> 상대 경로
        c = c.replace(b'/images/ncmhp/contents/', b'../images/contents/')
        # 2. 잘못된 상대 경로(../../ 등) -> 정확한 상대 경로(../)
        c = c.replace(b'../../images/contents/', b'../images/contents/')
        c = c.replace(b'../../fonts/', b'../fonts/')
        # 3. 루트 상대 경로(/mental_...) -> 정확한 상대 경로(../)
        c = c.replace(b'/mental_health_portfolio/images/contents/', b'../images/contents/')
        
        with open(path, 'wb') as f:
            f.write(c)
        print("CSS 번들 경로 최적화 완료.")

if __name__ == "__main__":
    fix_app_bundle()
