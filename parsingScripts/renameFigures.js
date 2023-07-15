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

        files.forEach((file, index) => {
            const filePath = path.join(directory, file);

            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('Error getting file stats:', err);
                    return;
                }

                if (stats.isFile() && file.endsWith('.md')) {

                    fs.readFile(filePath, {
                        encoding: "utf8",
                    }, (err, data) => {
                        if (err) {
                            console.error('Error reading file:', err);
                            return;
                        }

                        const updatedData = data.replace(new RegExp(`${oldFilename}`, 'g'), `${newFilename}`);
                        fs.writeFileSync(filePath, updatedData,
                            {
                                encoding: "utf8",
                                flag: "w",
                                mode: 0o666
                            });
                    });
                    if (stats.isDirectory()) {
                        renameImageFilenames(filePath, oldFilename, newFilename);
                    }
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

        files.forEach((file, index) => {
            if (index % 200 === 0) {
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

                            }
                        });

                        renameImageFilenames(contentsDirectory, oldFilename, newFilename);
                    }

                    if (stats.isDirectory()) {
                        renameAndModifyFiles(filePath);
                    }
                });
            }
        });
    });
}

renameAndModifyFiles(resourcesDirectory);
