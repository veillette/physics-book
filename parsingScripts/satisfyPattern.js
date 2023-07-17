const fs = require('fs');
const path = require('path');

const contentsDir = '../contents';
//const figureRegex = /Figure_(\d{2})_(\d{2})_(\d{2})(?:\S+)?\.(jpg|svg|webp|png)/g;
const figureRegex = /Figure_(\d{2})_(\d{2})_(\d{2})\.(jpg|svg|png|webp)/g;

// Function to check if a figure filename satisfies the pattern
function isFigureFilenameValid(filename) {
    return figureRegex.test(filename);
}

// Get the list of files in the 'contents' directory
fs.readdir(contentsDir, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    // Iterate through each file
    files.forEach((file) => {
        if (file.endsWith('.md')) {
            const filePath = path.join(contentsDir, file);
            const content = fs.readFileSync(filePath, 'utf8');
            const figureReferences = content.match(figureRegex);

            if (figureReferences) {
                // Check each figure reference in the Markdown file
                figureReferences.forEach((figureRef) => {
                    if (!isFigureFilenameValid(figureRef)) {
                        console.log(`Invalid figure reference in ${file}: ${figureRef}`);
                    } else {
                        console.log(`Valid figure reference in ${file}: ${figureRef}`);
                    }
                });
            }
        }
    });
});
