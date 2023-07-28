const fs = require('fs');
const path = require('path');

// Function to extract chapterNumber and sectionNumber from YAML block
function extractYAMLInfo(content) {
    const yamlRegex = /---([\s\S]*?)---/;
    const yamlMatch = yamlRegex.exec(content);
    if (!yamlMatch) return null;

    const yamlContent = yamlMatch[1];
    const chapterRegex = /chapterNumber: (\d+)/;
    const sectionRegex = /sectionNumber: (\d+)/;

    const chapterMatch = chapterRegex.exec(yamlContent);
    const sectionMatch = sectionRegex.exec(yamlContent);
    const chapterNumber = chapterMatch ? parseInt(chapterMatch[1]) : null;
    const sectionNumber = sectionMatch ? parseInt(sectionMatch[1]) : null;

    return {chapterNumber, sectionNumber};
}

// Function to validate figure references in markdown content
function validateFigures(content, chapterNumber, sectionNumber, file) {
    const figureRegex = /Figure_(\d+)_(\d+)_(\d+)\.(jpg|svg|webp|png)/g;
    const figures = new Set();

    let match;
    while ((match = figureRegex.exec(content))) {
        const [_, chapNum, sectNum, figNum] = match;
        if (parseInt(chapNum) === chapterNumber && parseInt(sectNum) === sectionNumber) {
            figures.add(parseInt(figNum));
        } else {
            console.error(`Invalid figure reference in ${file}. Expected Figure_${chapterNumber}_${sectionNumber}_${figures.size + 1}`);
        }
    }

    // Check if the figures are continuous
    const expectedFigureCount = Array.from(figures).pop();
    if (figures.size !== expectedFigureCount) {
        const missingFigures = [];
        for (let i = 1; i <= expectedFigureCount; i++) {
            const currentFigureName = `Figure_${chapterNumber}_${sectionNumber}_${i}`;
            if (!figures.has(i)) {
                const expectedFigureName = `Figure_${chapterNumber}_${sectionNumber}_${figures.size + 1}`;
                missingFigures.push({currentFigureName, expectedFigureName});
            }
        }

        const errorMessage = missingFigures
            .map(({currentFigureName, expectedFigureName}) =>
                `Figure '${currentFigureName}' should be renamed to '${expectedFigureName}'`
            )
            .join(', ');

        console.log(`Figure numbers are not continuous for Chapter ${chapterNumber}, Section ${sectionNumber}: ${file},  ${errorMessage}`);
    }
}

// Function to parse a single markdown file
function parseMarkdownFile(filePath, file) {
    const content = fs.readFileSync(filePath, 'utf8');
    const {chapterNumber, sectionNumber} = extractYAMLInfo(content);
    if (chapterNumber !== null && sectionNumber !== null) {
        validateFigures(content, chapterNumber, sectionNumber, file);
        //   console.log(`File ${filePath} successfully validated.`);
    } else {
        console.error(`Chapter or section information missing in the file ${filePath}.`);
    }
}

// Function to parse all markdown files in the 'contents' directory
function parseMarkdownFiles() {
    const contentsDirectory = path.join(__dirname, '../contents');
    fs.readdir(contentsDirectory, (err, files) => {
        if (err) {
            console.error('Error reading the contents directory:', err);
            return;
        }

        files.filter((file) => file.endsWith('.md')).forEach((file) => {
            const filePath = path.join(contentsDirectory, file);
            parseMarkdownFile(filePath, file);
        });
    });
}

// Run the script
parseMarkdownFiles();
