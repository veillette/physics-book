const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

const contentsDir = '../contents';

// Function to extract figure references from a Markdown file
function extractFigureReferences(content) {
    const figureRegex = /Figure_(\d{2})_\d{2}_\d{2}/g;
    const figureReferences = [];
    let match;

    while ((match = figureRegex.exec(content)) !== null) {
        const chapterNumber = parseInt(match[1]);
        const figureName = match[0];
        figureReferences.push({chapterNumber, figureName});
    }

    return figureReferences;
}

// Function to check if a figure filename follows the convention
function isFigureFilenameValid(filename, chapterNumber) {
    const expectedFigureName = `Figure_${chapterNumber.toString().padStart(2, '0')}_`;
    return filename.startsWith(expectedFigureName);
}

// Get the list of Markdown files in the 'contents' directory
readdir(contentsDir)
    .then((files) => {
        // Iterate through each Markdown file
        files.forEach(async (file) => {
            if (file.endsWith('.md')) {
                const filePath = path.join(contentsDir, file);
                const content = await readFile(filePath);
                const figureReferences = extractFigureReferences(content);

                // Check each figure reference in the Markdown file
                figureReferences.forEach(({chapterNumber, figureName}) => {
                    // Check if the figure filename follows the convention
                    if (isFigureFilenameValid(figureName, chapterNumber)) {
                        console.log(`Figure ${figureName} in ${file} is valid.`);
                    } else {
                        console.log(`Figure ${figureName} in ${file} does not follow the naming convention.`);
                    }
                });
            }
        });
    })
    .catch((err) => {
        console.error(err);
    });
