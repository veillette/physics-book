import fs from 'fs';
import path from 'path';

const directory = 'contents';

function countDelimiters(line) {
    let count = 0;
    let ignoreNext = false;
    for (const char of line) {
        if (char === '\\') {
            ignoreNext = true;
        } else if (char === '$' && !ignoreNext) {
            count += 1;
        } else {
            ignoreNext = false;
        }
    }
    return count;
}

function processFile(filePath) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        const lines = data.split('\n');
        for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            const line = lines[lineIndex];
            const lineNumber = lineIndex + 1;
            const delimiterCount = countDelimiters(line);
            if (delimiterCount % 2 !== 0) {
                console.log(`Flagged line in ${filePath} at line ${lineNumber}: ${line}`);
            }
        }
    });
}

function parseDirectory(directoryPath) {
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(directoryPath, file);
            processFile(filePath);
        });
    });
}

parseDirectory(directory);
