import fs from 'fs';
import path from 'path';

// Usage example:
const oldFileName = 'old_figure_name';
const newFileName = 'new_figure_name';
const directory = path.join(__dirname, '../contents/');


function renameFile(oldFileName, newFileName, directory) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('Error reading the directory:', err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(directory, file);

            fs.readFile(filePath, 'utf8', (readErr, data) => {
                if (readErr) {
                    console.error(`Error reading file ${filePath}:`, readErr);
                    return;
                }

                const updatedContent = data.replace(new RegExp(`\\b${oldFileName}\\b`, 'g'), newFileName);

                fs.writeFile(filePath, updatedContent, 'utf8', (writeErr) => {
                    if (writeErr) {
                        console.error(`Error writing to file ${filePath}:`, writeErr);
                    } else {
                        console.log(`File ${filePath} updated successfully.`);
                    }
                });
            });
        });
    });
}

renameFile(oldFileName, newFileName, directory);
