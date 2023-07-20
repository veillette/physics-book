import re

def parse_summary(file_path):
    with open(file_path, 'r') as file:
        content = file.read()

    chapters = re.findall(r'{: .chapter} \[(.*?)\]', content)
    sections = re.findall(r'{: .chapter} \[(.*?)\].*?\n((?:\s{3,}.+?\n)+)', content, re.DOTALL | re.MULTILINE)

    parsed_data = []
    for i, chapter in enumerate(chapters):
        section_data = sections[i][1]
        section_names = re.findall(r'\s{3,}(\d+\.\s.*?\))', section_data)
        section_files = re.findall(r'\((.*?)\)', section_data)
        chapter_sections = []

        for j, name in enumerate(section_names):
            section = {
                'chapter': i + 1,
                'section': j + 1,
                'name': name,
                'file': section_files[j]
            }
            chapter_sections.append(section)

        parsed_data.append({
            'chapter': i + 1,
            'name': chapter,
            'sections': chapter_sections
        })

    return parsed_data

summary_path = '../SUMMARY.md'
parsed_summary = parse_summary(summary_path)

for chapter in parsed_summary:
    print(f"Chapter {chapter['chapter']}: {chapter['name']}")
    for section in chapter['sections']:
        print(f"   Section {section['section']}: {section['name']} - {section['file']}")
