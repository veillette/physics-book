import fs from 'fs';
import path from 'path';

const resourcesDirectory = '../resources';
const contentsDirectory = '../contents';

/**
 *
 * @param {number} ms
 * @returns {Promise<unknown>}
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * @param {string} directory
 * @param {string} oldFilename
 * @param {string} newFilename
 */
function renameImageFilenames(directory, oldFilename, newFilename) {

    // read the directory contents
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        // iterate through files in directory
        files.forEach((file, index) => {
            const filePath = path.join(directory, file);

            // get file stats
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('Error getting file stats:', err);
                    return;
                }

                //  check if the file is a markdown file
                if (stats.isFile() && file.endsWith('.md')) {

                    // read the file
                    fs.readFile(filePath, {
                        encoding: "utf8",
                    }, (err, data) => {
                        if (err) {
                            console.error('Error reading file:', err);
                            return;
                        }

                        // create a regex to match the old filename
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

                    // recursively call renameImageFilenames on subdirectories
                    if (stats.isDirectory()) {
                        renameImageFilenames(filePath, oldFilename, newFilename);
                    }
                }
            });
        });
    });
}

/**
 * rename files and modify jpg filenames and update markdown files
 * @param {string} directory
 */
function renameAndModifyFiles(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach((file, index) => {
            const N= 1;
            if (index % N !== Math.round(Math.random() * N)) {
                const filePath = path.join(directory, file);

                // get file stats
                fs.stat(filePath, (err, stats) => {
                    if (err) {
                        console.error('Error getting file stats:', err);
                        return;
                    }

                    // rename files
                    if (stats.isFile() && file.endsWith('.jpg') && file.endsWith('a.jpg')) {

                        if (/\d{2}/.test(file)) {
                            // Check if the filename contains a number 20 and above
                            const number = parseInt(file.match(/\d+/)[0], 10);
                            if (number >= 3) {
                                const oldFilename = file;
                                const newFilename = file.replace(/a\.jpg$/, '.jpg');
                                const newFilePath = path.join(directory, newFilename);

                                // rename file

                                if (oldFilename !== newFilename) {
                                    fs.rename(filePath, newFilePath, (err) => {
                                        if (err) {
                                            console.error(`Error renaming file ${file}:`, err);
                                        } else {
                                            console.log(`Renamed file ${file} to ${newFilename}`);

                                        }
                                    });
                                    // modify markdown files
                                    renameImageFilenames(contentsDirectory, oldFilename, newFilename);
                                }
                            }
                        }
                    }

                    // recurse through directories
                    if (stats.isDirectory()) {
                        renameAndModifyFiles(filePath);
                    }
                });
            }
        });
    });
}

renameAndModifyFiles(resourcesDirectory);
