import os
import shutil

def final_asset_consolidation():
    target_dir = 'mental_health_portfolio/images/contents'
    if not os.path.exists(target_dir):
        os.makedirs(target_dir)

    # 검색할 소스 폴더들
    sources = [
        'mental_health_portfolio/images/extracted',
        'mental_health_portfolio/images/downloaded',
        'mental_health_portfolio/unused_assets/images/extracted',
        'mental_health_portfolio/unused_assets/images/downloaded'
    ]

    print("--- 이미지 집결 시작 ---")
    for s_dir in sources:
        if os.path.exists(s_dir):
            for filename in os.listdir(s_dir):
                src_path = os.path.join(s_dir, filename)
                dest_path = os.path.join(target_dir, filename)
                if os.path.isfile(src_path) and not os.path.exists(dest_path):
                    shutil.copy2(src_path, dest_path)
                    print(f"복사됨: {filename}")

    # CSS에서 logo.png를 못 찾는 경우가 많으므로 확인
    if not os.path.exists(os.path.join(target_dir, 'logo.png')):
        print("경고: logo.png가 아직 없습니다!")

if __name__ == "__main__":
    final_asset_consolidation()
