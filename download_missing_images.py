import os
import urllib.request

# Configuration
BASE_URL = "https://www.mentalhealth.go.kr/images/ncmhp/contents/"
SAVE_DIR = "mental_health_portfolio/images/downloaded/"

# Missing files list
files_to_download = [
    "btn_visual_control.png", "bul_all.png", "ico_link.png", "ico_print.png", 
    "img_faq.jpg", "img_medi.jpg", "img_statics.png", "m_bul_all.png", 
    "m_gnb_clo.png", "self_check_img.jpg", "subTitl_line_left.png", "subTitl_line_right.png",
    "btn_end.png", "btn_first.png", "btn_next.png", "btn_prev.png", "btn_sch_b.png", 
    "bullet_disease_part_on.png", "ico_noti.png", "ico_notice.png", "ico_select.png", "symp_img.png"
]

if not os.path.exists(SAVE_DIR):
    os.makedirs(SAVE_DIR)

print("--- Starting download to " + SAVE_DIR + " ---")

downloaded_count = 0
failed_count = 0

# Set User-Agent to avoid 403 Forbidden
opener = urllib.request.build_opener()
opener.addheaders = [('User-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)')]
urllib.request.install_opener(opener)

for file_name in files_to_download:
    target_path = os.path.join(SAVE_DIR, file_name)
    
    if os.path.exists(target_path):
        print("File already exists: " + file_name + ". Skipping.")
        continue
    
    source_url = BASE_URL + file_name
    try:
        print("Downloading: " + source_url + " ...")
        urllib.request.urlretrieve(source_url, target_path)
        print("Success!")
        downloaded_count += 1
    except Exception as e:
        print("Failed: " + file_name + " Error: " + str(e))
        failed_count += 1

print("\n--- Download Summary ---")
print("Successfully downloaded: " + str(downloaded_count))
print("Failed: " + str(failed_count))
