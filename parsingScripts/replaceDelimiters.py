import re
import os

def replace_equation_delimiters(text):
    pattern = r'<div class="equation">(.*?)<\/div>'
    replacement = lambda match: re.sub(r'\$(.*?)\$', r'$$\1$$', match.group(0))
    return re.sub(pattern, replacement, text, flags=re.DOTALL)

def replace_all_delimiters(text):
    pattern = r'\$\$'
    replacement = r'$'
    return re.sub(pattern, replacement, text)

# Path to the contents folder
folder_path = 'contents'

# Iterate over files in the folder
for file_name in os.listdir(folder_path):
    if file_name.endswith('.md'):
        file_path = os.path.join(folder_path, file_name)
        
        # Read the content from the file
        with open(file_path, 'rt', encoding='utf-8') as file:
            content = file.read()
        
        # Replace equation delimiters
        updated_content = replace_all_delimiters(content)
        updated_content1 = replace_equation_delimiters(updated_content)
        
        # Write the updated content back to the file
        with open(file_path, 'w', encoding="utf-8") as file:
            file.write(updated_content1)