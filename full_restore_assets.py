import os
import shutil

def restore_all_assets():
    # unused_assets 내의 구조를 다시 mental_health_portfolio로 병합
    base_unused = 'mental_health_portfolio/unused_assets'
    base_target = 'mental_health_portfolio'
    
    if not os.path.exists(base_unused):
        print("unused_assets 폴더가 없습니다.")
        return

    for root, dirs, files in os.walk(base_unused):
        for file in files:
            src_path = os.path.join(root, file)
            # 상대 경로 계산 (images/extracted/logo.png 등)
            rel_path = os.relpath(src_path, base_unused)
            dest_path = os.path.join(base_target, rel_path)
            
            dest_dir = os.path.dirname(dest_path)
            if not os.path.exists(dest_dir):
                os.makedirs(dest_dir)
            
            # 파일 복사 (이미 있으면 덮어쓰기)
            shutil.copy2(src_path, dest_path)
            print(f"복구: {rel_path}")

    print("모든 자산이 원위치되었습니다.")

if __name__ == "__main__":
    restore_all_assets()
