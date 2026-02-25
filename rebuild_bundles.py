import os
import re

def create_perfect_bundles():
    css_old_dir = 'mental_health_portfolio/css/old'
    css_out_dir = 'mental_health_portfolio/css'
    
    # 1. vendor.bundle.css 구성 (라이브러리)
    vendor_files = ['xeicon.min.css', 'swiper.min.css', 'aos.css', 'jqueryui.css']
    # 2. app.bundle.css 구성 (서비스 스타일)
    app_files = [
        'portal_reset.css', 
        'portal_layout.css', 
        'portal_contents.css', 
        'popup.css', 
        'pretendard.css', 
        'SCoreDream-font-face.css', 
        'SCoreDream-font-family.css'
    ]

    def combine_and_fix(file_list, output_name):
        combined_content = b""
        for fname in file_list:
            fpath = os.path.join(css_old_dir, fname)
            if os.path.exists(fpath):
                with open(fpath, 'rb') as f:
                    content = f.read()
                
                # 경로 수정: ../../ (old 폴더 기준) -> ../ (번들 폴더 기준)
                # 이미지 및 폰트 경로를 한 단계 아래로 조정
                content = content.replace(b'../../images/contents/', b'../images/contents/')
                content = content.replace(b'../../fonts/', b'../fonts/')
                
                combined_content += b"
/* --- Source: " + fname.encode() + b" --- */
"
                combined_content += content
        
        with open(os.path.join(css_out_dir, output_name), 'wb') as f:
            f.write(combined_content)
        print(f"생성 완료: {output_name}")

    combine_and_fix(vendor_files, 'vendor.bundle.css')
    combine_and_fix(app_files, 'app.bundle.css')

if __name__ == "__main__":
    create_perfect_bundles()
