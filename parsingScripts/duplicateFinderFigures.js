import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

const contentsDir = '../contents';

// Function to extract figure references from a Markdown file
function extractFigureReferences(content, file) {
    const figureRegex = /Figure_(\d{2})_(\d{2})_(\d{2})(?:\S+)?\.(jpg|svg|webp|png)/g;
    const figureReferences = [];
    let match;

    while ((match = figureRegex.exec(content)) !== null) {
        const figureName = match[0];
        figureReferences.push(figureName);
    }

    console.log(`${file}: ${figureReferences.length} figure references found`);
    console.table(figureReferences);
    return figureReferences;
}

// Get the list of Markdown files in the 'contents' directory
readdir(contentsDir)
    .then((files) => {
        const figureCountMap = {};

        // Iterate through each Markdown file
        files.forEach(async (file) => {
            if (file.endsWith('.md')) {
                const filePath = path.join(contentsDir, file);
                const content = await readFile(filePath);
                const figureReferences = extractFigureReferences(content, file);

                // Count the occurrences of each figure reference
                figureReferences.forEach((figure) => {
                    if (figureCountMap.hasOwnProperty(figure)) {
                        figureCountMap[figure]++;
                    } else {
                        figureCountMap[figure] = 1;
                    }
                });
            }
        });

        // Find figures that have been referenced more than once
        const duplicateFigures = Object.entries(figureCountMap)
            .filter(([_, count]) => count > 1)
            .map(([figure]) => figure);

        // Output the duplicate figures
        if (duplicateFigures.length !== 0) {
            console.log('Figures referenced more than once:');
            duplicateFigures.forEach((figure) => {
                console.log(figure);
            });
        } else {
            console.log('No figures referenced more than once.');
        }
    })
    .catch((err) => {
        console.error(err);
    });
