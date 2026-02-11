import re
import json
import os

def read_css_and_find_rule(file_path):
    full_content = ""
    media_query_blocks = []
    logo_rules = []

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            full_content = f.read()

        lines = full_content.splitlines()
        
        in_media_query_block = False
        media_block_content = []
        media_block_level = 0 

        for line in lines:
            if re.search(r'@media\s+screen\s+and\s+\(max-width:\s*960px\)', line):
                in_media_query_block = True
                media_block_content = [line] 
                media_block_level = line.count('{') - line.count('}') 
                continue
            
            if in_media_query_block:
                media_block_content.append(line)
                media_block_level += line.count('{')
                media_block_level -= line.count('}')

                if media_block_level <= 0 and '}' in line: 
                    block_text = "\n".join(media_block_content)
                    media_query_blocks.append(block_text)
                    
                    logo_rule_pattern_1 = re.compile(
                        r'(\.gnb_nav.*?(?:img|\[src\*=["\']cmpn_logo\.png["\']\]).*?\{.*?(?:width|height|max-width|margin-bottom).*?\})',
                        re.DOTALL
                    )
                    logo_rule_pattern_2 = re.compile(
                        r'(img\[src\*=["\']cmpn_logo\.png["\']].*?\{.*?(?:width|height|max-width|margin-bottom).*?\})',
                        re.DOTALL
                    )

                    logo_matches_1 = logo_rule_pattern_1.finditer(block_text)
                    for logo_match in logo_matches_1:
                        logo_rules.append(logo_match.group(1))
                    
                    logo_matches_2 = logo_rule_pattern_2.finditer(block_text)
                    for logo_match in logo_matches_2:
                        logo_rules.append(logo_match.group(1))

                    in_media_query_block = False
                    media_block_content = []
                    media_block_level = 0

        if in_media_query_block and media_block_content:
            block_text = "\n".join(media_block_content)
            media_query_blocks.append(block_text)
            
            logo_rule_pattern_1 = re.compile(
                r'(\.gnb_nav.*?(?:img|\[src\*=["\']cmpn_logo\.png["\']\]).*?\{.*?(?:width|height|max-width|margin-bottom).*?\})',
                re.DOTALL
            )
            logo_rule_pattern_2 = re.compile(
                r'(img\[src\*=["\']cmpn_logo\.png["\']].*?\{.*?(?:width|height|max-width|margin-bottom).*?\})',
                re.DOTALL
            )

            logo_matches_1 = logo_rule_pattern_1.finditer(block_text)
            for logo_match in logo_matches_1:
                logo_rules.append(logo_match.group(1))
            
            logo_matches_2 = logo_rule_pattern_2.finditer(block_text)
            for logo_match in logo_matches_2:
                logo_rules.append(logo_match.group(1))


    except FileNotFoundError:
        return {"error": f"File not found: {file_path}"}
    except Exception as e:
        return {"error": f"An error occurred: {e}"}

    return {
        "full_content_length": len(full_content),
        "media_query_blocks_found": len(media_query_blocks),
        "media_query_blocks_content": media_query_blocks,
        "logo_rules_found": len(logo_rules),
        "logo_rules_content": logo_rules
    }

if __name__ == "__main__":
    css_file_path = "mental_health_portfolio/css/portal_contents.css"
    result = read_css_and_find_rule(css_file_path)
    print(json.dumps(result, indent=2, ensure_ascii=False))