import os
import re

directory = 'contents'

def parse_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        file_content = file.read()
        parsed_content = re.sub(r'\$\$(.*?)\$\$', lambda match: match.group(0).replace('_', r'\_'), file_content, flags=re.DOTALL)
        with open(file_path, 'w', encoding='utf-8') as output_file:
            output_file.write(parsed_content)

def parse_directory(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            parse_file(file_path)

parse_directory(directory)
