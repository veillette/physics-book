import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

const contentsDir = '../contents';

// Function to extract figure filenames from a Markdown file
function extractFigureFilenames(content) {
    const figureRegex = /Figure_(\d{2})_(\d{2})_(\d{2})\.jpg/g;
    const figureFilenames = [];
    let match;

    while ((match = figureRegex.exec(content)) !== null) {
        const chapterNumber = match[1];
        const moduleNumber = match[2];
        const seriesNumber = match[3];
        figureFilenames.push({chapterNumber, moduleNumber, seriesNumber});
    }

    return figureFilenames;
}

// Function to check if all figure filenames share the same chapter and module number
function areFigureFilenamesConsistent(figureFilenames) {
    if (figureFilenames.length === 0) {
        return true;
    }

    const firstChapterNumber = figureFilenames[0].chapterNumber;
    const firstModuleNumber = figureFilenames[0].moduleNumber;
    const firstSeriesNumber = figureFilenames[0].seriesNumber;

    return figureFilenames.every(
        (figure) => figure.chapterNumber === firstChapterNumber && figure.moduleNumber === firstModuleNumber
    );
}

// Function to generate the appropriate figure filename following the convention
function generateAppropriateFilename(chapterNumber, moduleNumber, seriesNumber) {
    const chapter = chapterNumber.toString().padStart(2, '0');
    const module = moduleNumber.toString().padStart(2, '0');
    const series = seriesNumber.toString().padStart(2, '0');

    return `Figure_${chapter}_${module}_${series}.jpg`;
}

// Get the list of Markdown files in the 'contents' directory
readdir(contentsDir)
    .then((files) => {
        // Iterate through each Markdown file
        files.forEach(async (file) => {
            if (file.endsWith('.md')) {
                const filePath = path.join(contentsDir, file);
                const content = await readFile(filePath);
                const figureFilenames = extractFigureFilenames(content);

                // Check if all figure filenames in the Markdown file are consistent
                if (areFigureFilenamesConsistent(figureFilenames)) {
                    //     console.log(`Figure filenames in ${file} are consistent.`);
                } else {
                    console.log(`Figure filenames in ${file} are not consistent.`);

                    // Identify the appropriate filenames for inconsistent figures
                    const firstChapterNumber = figureFilenames[0].chapterNumber;
                    const firstModuleNumber = figureFilenames[0].moduleNumber;
                    const firstSeriesNumber = figureFilenames[0].seriesNumber;

                    figureFilenames.forEach((figure) => {
                        const expectedFilename = generateAppropriateFilename(firstChapterNumber, firstModuleNumber, firstSeriesNumber);
                        const currentFilename = `Figure_${figure.chapterNumber}_${figure.moduleNumber}_${figure.seriesNumber}.jpg`;

                        if (currentFilename !== expectedFilename) {
                            console.log(`Inconsistent figure: ${currentFilename}. Should be: ${expectedFilename}`);
                        }
                    });
                }
            }
        });
    })
    .catch((err) => {
        console.error(err);
    });
