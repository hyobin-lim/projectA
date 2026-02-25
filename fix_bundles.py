import re
import os

def analyze_and_fix_bundle(file_path, file_type):
    print(f"--- Analyzing {file_path} ---")
    if not os.path.exists(file_path):
        print(f"File {file_path} does not exist.")
        return

    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    modified = False

    if file_type == "js":
        if "<script" in content or "</script>" in content:
            print(f"Found <script> tags in {file_path}. Removing...")
            content = re.sub(r"</?script[^>]*>", "", content)
            modified = True
        
        if "vendor.bundle.js" in file_path and "window.jQuery" not in content:
            print(f"Adding global jQuery assignment to {file_path}")
            content += "\nif (typeof jQuery !== 'undefined') { window.jQuery = window.$ = jQuery; }"
            modified = True

    elif file_type == "css":
        if content.lower().count("@charset") > 1:
            print(f"Cleaning multiple charsets in {file_path}")
            content = re.sub(r"@charset\s+[\"']utf-8[\"']\s*;\s*", "", content, flags=re.IGNORECASE)
            content = "@charset \"utf-8\";\n" + content
            modified = True
        
        # Absolute to relative
        abs_url = r"https://www\.mentalhealth\.go\.kr/images/ncmhp/contents/"
        if re.search(abs_url, content):
            content = content.replace("https://www.mentalhealth.go.kr/images/ncmhp/contents/", "../images/extracted/")
            modified = True

        root_url = r"/images/ncmhp/contents/"
        if re.search(root_url, content):
            content = content.replace("/images/ncmhp/contents/", "../images/extracted/")
            modified = True

    if modified:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Successfully updated {file_path}.")
    else:
        print(f"No issues found in {file_path}.")

analyze_and_fix_bundle("mental_health_portfolio/js/vendor.bundle.js", "js")
analyze_and_fix_bundle("mental_health_portfolio/js/main.bundle.js", "js")
analyze_and_fix_bundle("mental_health_portfolio/css/vendor.bundle.css", "css")
analyze_and_fix_bundle("mental_health_portfolio/css/app.bundle.css", "css")
