import codecs
import sys

def read_css_file(file_path):
    encodings = ['utf-8', 'euc-kr', 'cp949'] # 일반적인 웹 파일 인코딩 순서
    for encoding in encodings:
        try:
            with codecs.open(file_path, 'r', encoding=encoding) as f:
                content = f.read()
            return content
        except UnicodeDecodeError:
            continue
        except FileNotFoundError:
            print(f"Error: File not found at {file_path}", file=sys.stderr)
            return None
        except Exception as e:
            print(f"Error reading file with {encoding} encoding: {e}", file=sys.stderr)
            return None
    print(f"Error: Could not decode file {file_path} with any of the tried encodings.", file=sys.stderr)
    return None

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python read_css_file.py <file_path>", file=sys.stderr)
        sys.exit(1)

    file_path = sys.argv[1]
    content = read_css_file(file_path)
    if content is not None:
        print(content)
