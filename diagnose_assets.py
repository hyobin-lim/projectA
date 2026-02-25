
import re
import os

def check_font_paths():
    css_path = "mental_health_portfolio/css/app.bundle.css"
    if not os.path.exists(css_path):
        print(f"CSS file not found: {css_path}")
        return

    with open(css_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Find all font URLs
    font_urls = re.findall(r"url\s*\(\s*['"]?([^"'\)]+\.(?:woff2?|ttf|eot|otf|svg))["']?\s*\)", content, re.IGNORECASE)
    unique_font_urls = sorted(list(set(font_urls)))

    print("--- Checking Font Paths in CSS ---")
    for url in unique_font_urls:
        # relative path from css folder to actual file
        # e.g., ../fonts/Xeicon/xeicon.woff2
        actual_path = os.path.abspath(os.path.join("mental_health_portfolio/css", url))
        exists = os.path.exists(actual_path)
        status = "OK" if exists else "MISSING"
        print(f"[{status}] {url}")

def check_manifest():
    manifest_path = "mental_health_portfolio/images/favicon/manifest.json"
    print(f"
--- Checking Manifest: {manifest_path} ---")
    if not os.path.exists(manifest_path):
        print("Manifest file MISSING")
        return
    
    with open(manifest_path, "r", encoding="utf-8") as f:
        print(f.read())

if __name__ == "__main__":
    check_font_paths()
    check_manifest()
