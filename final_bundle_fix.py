import re
import os

def extract_and_bundle():
    html_path = 'index.html'
    js_out_path = 'mental_health_portfolio/js/inline_scripts.js'
    
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. 인라인 스크립트 추출 (src 속성이 없는 <script> 태그)
    # 정규식으로 <script>...</script> 내용을 캡처합니다.
    inline_patterns = re.findall(r'<script(?![^>]*src\s*=)[^>]*>(.*?)</script>', content, re.DOTALL)
    
    combined_js = "/* Extracted Inline Scripts */
"
    for script in inline_patterns:
        s = script.strip()
        if s:
            combined_js += "
(function(){
" + s + "
})();
"

    # 추출된 내용이 있다면 저장
    if inline_patterns:
        with open(js_out_path, 'w', encoding='utf-8') as f:
            f.write(combined_js)
        print(f"인라인 스크립트 {len(inline_patterns)}개를 추출하여 {js_out_path}에 저장했습니다.")
    else:
        print("추출할 인라인 스크립트가 없습니다.")

    # 2. HTML에서 인라인 스크립트 제거
    content = re.sub(r'<script(?![^>]*src\s*=)[^>]*>.*?</script>', '', content, flags=re.DOTALL)

    # 3. 개별 JS 링크를 번들로 교체
    # 현재 하단의 9개 개별 스크립트 링크 영역을 타겟팅
    old_scripts = r'    <script src="mental_health_portfolio/js/old/jquery\.min\.js"></script>.*?<script src="mental_health_portfolio/js/old/popup\.js"></script>'
    
    new_scripts = '    <script src="mental_health_portfolio/js/vendor.bundle.js"></script>
'
    new_scripts += '    <script src="mental_health_portfolio/js/main.bundle.js"></script>
'
    # 추출한 스크립트가 있다면 그것도 링크 추가
    if inline_patterns:
        new_scripts += '    <script src="mental_health_portfolio/js/inline_scripts.js"></script>
'

    content = re.sub(old_scripts, new_scripts, content, flags=re.DOTALL)

    # 4. 결과 저장
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("index.html 정리를 완료했습니다.")

if __name__ == "__main__":
    extract_and_bundle()
