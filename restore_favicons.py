import os
import shutil

def restore_favicons():
    # manifest.json 및 favicon 관련 파일을 원본 경로로 복구
    source_dir = 'mental_health_portfolio/unused_assets/images/favicon'
    target_dir = 'mental_health_portfolio/images/favicon'
    
    if os.path.exists(source_dir):
        if not os.path.exists(target_dir):
            os.makedirs(target_dir)
        
        files = os.listdir(source_dir)
        for f in files:
            source_path = os.path.join(source_dir, f)
            target_path = os.path.join(target_dir, f)
            try:
                shutil.move(source_path, target_path)
                print(f"Restored: {f}")
            except Exception as e:
                print(f"Error restoring {f}: {e}")
    else:
        print("Source directory not found.")

restore_favicons()
