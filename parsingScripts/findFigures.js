const fs = require('fs');
const path = require('path');

const markdownDirectory = '../contents';
const resourcesDirectory = '../resources';


/**
 *
 * @param {string} directory
 * @returns {string[]}
 */
function parseMarkdownFiles(directory) {

    // {string[]}
    let jpgFilenames = [];

    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(directory, file);

            if (file.endsWith('.md')) {
                fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) {
                        console.error('Error reading file:', err);
                        return;
                    }

                    const jpgFiles = data.match(/!\[.*\]\((.*)\.jpg\)/g);

                    if (jpgFiles) {
                        jpgFiles.forEach((jpgFile) => {
                            const fileName = jpgFile.match(/\((.*)\.jpg\)/)[1];
                            jpgFilenames.push(fileName);
                        });
                    }
                });
            }

            if (fs.statSync(filePath).isDirectory()) {
                parseMarkdownFiles(filePath);
            }
        });
    });
    return jpgFilenames;
}

function checkJpgFiles(directory, filenames) {
    filenames.forEach((filename) => {
        const jpgFilePath = path.join(directory, `${filename}.jpg`);
        console.log(jpgFilePath);
        fs.access(jpgFilePath, fs.constants.F_OK, (err) => {
            if (err) {
                console.error(`Missing JPEG file: ${filename}.jpg`);
            } else {
                console.log(`Found JPEG file: ${filename}.jpg`);
            }
        });
    });
}

const jpgFilenames = parseMarkdownFiles(markdownDirectory);
jpgFilenames.forEach((jpgFile) => {
    console.log(jpgFile);
});

checkJpgFiles(resourcesDirectory, jpgFilenames);
