import subprocess
import os

def find_lost_index():
    print("--- Start Search ---")
    try:
        # Get lost objects
        res = subprocess.run(['git', 'fsck', '--lost-found'], capture_output=True, text=True)
        lines = res.stdout.split('\n')
    except:
        return

    blobs = [l.split()[2] for l in lines if 'dangling blob' in l]
    print(f"Blobs to check: {len(blobs)}")

    # We are looking for the version that has bundles and the popup
    keywords = ["vendor.bundle.css", "popupOverlay", "main.bundle.js"]
    
    for h in blobs:
        try:
            # Try to read the blob content
            c_res = subprocess.run(['git', 'show', h], capture_output=True, text=True, encoding='utf-8')
            content = c_res.stdout
            
            matches = [kw for kw in keywords if kw in content]
            if len(matches) >= 2:
                print(f"Found potential match: {h}")
                print(f"Matches: {matches}")
                # Save it for safety
                out_name = "recovered_" + h[:7] + ".html"
                with open(out_name, "w", encoding="utf-8") as f:
                    f.write(content)
                print(f"Saved to {out_name}")
        except:
            continue

if __name__ == "__main__":
    find_lost_index()
