
import os

def check_all_links():
    print("--- Starting Full Link Audit ---")
    
    # Check index.html
    if os.path.exists("index.html"):
        with open("index.html", "r", encoding="utf-8") as f:
            content = f.read()
            
        print("
[index.html Assets]")
        import re
        links = re.findall(r'(?:src|href)="([^"]+)"', content)
        for link in links:
            if link.startswith("http") or link.startswith("#") or link.startswith("javascript"):
                continue
            
            # Resolve relative path
            full_path = os.path.join(os.getcwd(), link.replace("/", os.sep))
            status = "OK" if os.path.exists(full_path) else "MISSING"
            print(f"[{status}] {link}")

def check_css_fonts():
    print("
[CSS Font Audit]")
    css_path = "mental_health_portfolio/css/app.bundle.css"
    if not os.path.exists(css_path): return
    
    with open(css_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Simple search for font extensions
    lines = content.split('url(')
    for line in lines[1:]:
        path = line.split(')')[0].strip("'"")
        if any(ext in path.lower() for ext in ['.woff', '.ttf', '.eot', '.otf', '.svg']):
            # Paths in CSS are relative to CSS file
            actual_path = os.path.abspath(os.path.join("mental_health_portfolio/css", path))
            status = "OK" if os.path.exists(actual_path) else "MISSING"
            print(f"[{status}] {path}")

if __name__ == "__main__":
    check_all_links()
    check_css_fonts()
