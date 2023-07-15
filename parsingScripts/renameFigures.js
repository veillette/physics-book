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

                        const regex = new RegExp(`${oldFilename}`, 'g');

                        // check that the old filename is in the file
                        if (data.match(regex)) {
                            const updatedData = data.replace(regex, `${newFilename}`);
                            fs.writeFile(filePath, updatedData,
                                (err) => {
                                    if (err) {
                                        console.error('Error writing file:', err);
                                    } else {
                                        console.log(`Updated ${filePath}`);
                                    }
                                });
                        }
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
            if (index % 50 === 0) {
                const filePath = path.join(directory, file);


                function sleep(ms) {
                    return new Promise((resolve) => {
                        setTimeout(resolve, ms);
                    });
                }

                sleep(100);

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
