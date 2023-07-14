const fs = require('fs');
const path = require('path');

const resourcesDirectory = '../resources';
const contentsDirectory = '../contents';

function renameImageFilenames(directory, oldFilename, newFilename) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(directory, file);

            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('Error getting file stats:', err);
                    return;
                }

                if (stats.isFile() && file.endsWith('.md')) {
                    fs.readFile(filePath, 'utf8', (err, data) => {
                        if (err) {
                            console.error('Error reading file:', err);
                            return;
                        }

                        const updatedData = data.replace(new RegExp(`\\]\\(${oldFilename}\\)`, 'g'), `](${newFilename})`);

                        fs.writeFile(filePath, updatedData, 'utf8', (err) => {
                            if (err) {
                                console.error('Error updating file:', err);
                            } else {
                                console.log(`Updated references in file ${file}`);
                            }
                        });
                    });
                }
                if (stats.isDirectory()) {
                    renameImageFilenames(filePath, oldFilename, newFilename);
                }
            });
        });
    });
}

function renameAndModifyFiles(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(directory, file);

            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('Error getting file stats:', err);
                    return;
                }

                if (stats.isFile() && file.endsWith('.jpg') && file.endsWith('a.jpg')) {
                    const oldFilename = file;
                    const newFilename = file.replace(/a\.jpg$/, '.jpg');
                    const newFilePath = path.join(directory, newFilename);

                    fs.rename(filePath, newFilePath, (err) => {
                        if (err) {
                            console.error(`Error renaming file ${file}:`, err);
                        } else {
                            console.log(`Renamed file ${file} to ${newFilename}`);
                            renameImageFilenames(contentsDirectory, oldFilename, newFilename);
                        }
                    });
                }

                if (stats.isDirectory()) {
                    renameAndModifyFiles(filePath);
                }
            });
        });
    });
}

renameAndModifyFiles(resourcesDirectory);
