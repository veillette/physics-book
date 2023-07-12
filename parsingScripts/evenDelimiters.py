import os

directory = '../contents'

def count_delimiters(line):
    count = 0
    ignore_next = False
    for char in line:
        if char == '\\':
            ignore_next = True
        elif char == '$' and not ignore_next:
            count += 1
        else:
            ignore_next = False
    return count

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        for line_number, line in enumerate(file, 1):
            delimiter_count = count_delimiters(line)
            if delimiter_count % 2 != 0:
                print(f"Flagged line in {file_path} at line {line_number}: {line}")

def parse_directory(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            process_file(file_path)

parse_directory(directory)
