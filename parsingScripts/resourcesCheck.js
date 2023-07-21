const fs = require('fs');
const path = require('path');

function parseFigures() {
    const resourcesDirectory = path.join(__dirname, '../resources');
    fs.readdir(resourcesDirectory, (err, files) => {
        if (err) {
            console.error('Error reading the resources directory:', err);
            return;
        }

        const figureMap = new Map();

        files.forEach((file) => {
            const figureRegex = /^Figure_(\d+)_(\d+)_(\d+)\.(jpg|svg|webp|png)/g;
            const match = figureRegex.exec(file);

            if (match) {
                const [, chapterNumber, sectionNumber, figureNumber] = match;
                const chapterSectionKey = `${chapterNumber}_${sectionNumber}`;

                // console.log(`Found figure ${file} for Chapter/Section ${chapterSectionKey}.`);
                if (!figureMap.has(chapterSectionKey)) {
                    figureMap.set(chapterSectionKey, new Set());
                }

                figureMap.get(chapterSectionKey).add(parseInt(figureNumber));
            }
        });

        figureMap.forEach((figureSet, chapterSectionKey) => {
            const maxFigureNumber = Math.max(...figureSet);
            const expectedFigureNumbers = new Set(Array.from({length: maxFigureNumber}, (_, i) => i + 1));

            const missingFigureNumbers = new Set(
                Array.from(expectedFigureNumbers).filter((num) => !figureSet.has(num))
            );

            if (figureSet.size !== maxFigureNumber || missingFigureNumbers.size > 0) {
                console.error(`Figure numbers are not sequential for Chapter/Section ${chapterSectionKey}: maxFigureNumber=${maxFigureNumber}, figureSet.size=${figureSet.size}`);

                if (missingFigureNumbers.size > 0) {
                    console.error(`Missing figures: ${Array.from(missingFigureNumbers).join(', ')}`);
                }
            } else {
                //   console.log(`Figure numbers are sequential for Chapter/Section ${chapterSectionKey}.`);
            }
        });
    });
}

// Helper function to check if two sets are equal
function isEqualSet(setA, setB) {
    if (setA.size !== setB.size) return false;
    for (const item of setA) {
        if (!setB.has(item)) return false;
    }
    return true;
}

// Run the script
parseFigures();
