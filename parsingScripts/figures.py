import os
import re

def find_referenced_figures(directory):
    referenced_figures = set()

    # Find all markdown files in the directory
    markdown_files = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".md"):
                markdown_files.append(os.path.join(root, file))

    # Search for figure references in markdown files
    for markdown_file in markdown_files:
        with open(markdown_file, "r", encoding="utf-8") as file:
            content = file.read()

            # Find figure references in markdown files
            figure_references = re.findall(r"Figure.*?\.jpg", content)
            referenced_figures.update(figure_references)

    return referenced_figures

# Directory paths
resources_directory = "../resources"
contents_directory = "../contents"

# Get all figures in the resources directory with the .jpg extension
all_figures = set(file for file in os.listdir(resources_directory) if file.endswith(".jpg"))

# Get referenced figures in the contents directory
referenced_figures = find_referenced_figures(contents_directory)

# Find figures not referenced in any markdown file
unreferenced_figures = all_figures - referenced_figures

# Print the unreferenced figures
print("Unreferenced figures:")
for figure in sorted(unreferenced_figures):
    print(figure)
