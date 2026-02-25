import re
import os

def extract_inline_scripts():
    html_path = 'index.html'
    js_dir = 'mental_health_portfolio/js'
    js_filename = 'inline_scripts.js'
    js_path = os.path.join(js_dir, js_filename)
    
    if not os.path.exists(html_path):
        return

    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()

    inline_scripts = re.findall(r'<script(?![^>]*src\s*=)[^>]*>(.*?)</script>', content, re.DOTALL)
    
    combined_js = "/* Extracted Inline Scripts */"
    for script in inline_scripts:
        script_clean = script.strip()
        if script_clean:
            combined_js += "\n(function() {\n" + script_clean + "\n})();\n"

    if not os.path.exists(js_dir):
        os.makedirs(js_dir)
    
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(combined_js)
    
    new_html = re.sub(r'<script(?![^>]*src\s*=)[^>]*>.*?</script>', '', content, flags=re.DOTALL)
    js_link = '\n    <script src="mental_health_portfolio/js/' + js_filename + '"></script>\n'
    new_html = new_html.replace('</body>', js_link + '</body>')
    
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(new_html)
    
    print("Success: Scripts separated.")

if __name__ == "__main__":
    extract_inline_scripts()
