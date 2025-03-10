import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

// Function to update the YAML block in a file
function updateYAMLBlock(filePath, sectionNumber, chapterNumber) {
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Regular expression to locate the YAML block
    const yamlRegex = /^---\s*[\r\n]([\s\S]*?)\r?\n?---\s*[\r\n]/;

    const match = fileContent.match(yamlRegex);
    if (match) {
        const yamlString = match[1];
        const yamlData = yaml.load(yamlString);
        yamlData.sectionNumber = sectionNumber;
        yamlData.chapterNumber = chapterNumber;
        const updatedYAML = yaml.dump(yamlData, { indent: 2, lineWidth: -1, json: true });
        const updatedFileContent = fileContent.replace(yamlRegex, `---\n${updatedYAML}---\n\n`);
        fs.writeFileSync(filePath, updatedFileContent, 'utf8');
    } else {
        console.error(`YAML block not found in file: ${filePath}`);
    }
}

// Function to parse the contents directory and update YAML blocks
function processContentsDirectory(directoryPath, summaryData) {
    summaryData.forEach((chapterData) => {
        const chapterFile = chapterData.chapterFile;
        const sections = chapterData.sections;

        // console.log(chapterData);
        sections.forEach((section) => {
            const sectionFile = path.join(directoryPath, section.sectionFile);
            updateYAMLBlock(sectionFile, section.sectionNumber, chapterData.chapterNumber);
        });
        const longChapterFile = path.join(directoryPath, chapterFile);
        updateYAMLBlock(longChapterFile, 0, chapterData.chapterNumber);

    });
}

// Entry point of the script
const summaryFilePath = path.join(__dirname, '../summary.json');
const summaryContent = fs.readFileSync(summaryFilePath, 'utf8');
const summaryData = JSON.parse(summaryContent);
// console.log('summaryData:', summaryData);

// Since the "contents" directory is not in the same directory as the script
const contentsDirectoryPath = path.join(__dirname, '../');

processContentsDirectory(contentsDirectoryPath, summaryData);
console.log('YAML blocks updated successfully!');
