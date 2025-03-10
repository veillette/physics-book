import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDirectory = '../resources'; // Replace with the path to your input directory
const outputDirectory = '../output'; // Replace with the path to the desired output directory

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory);
}

fs.readdir(inputDirectory, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    files.forEach(file => {
        const inputPath = path.join(inputDirectory, file);
        const extension = path.extname(file).toLowerCase();
        if (extension === '.jpg' || extension === '.jpeg' || extension === '.png') {
            const fileName = path.basename(file, extension);
            const outputPath = path.join(outputDirectory, `${fileName}.webp`);

            sharp(inputPath)
                .toFile(outputPath, (err, info) => {
                    if (err) {
                        console.error(`Error converting ${file}:`, err);
                    } else {
                        console.log(`Converted ${file} to WebP:`, info);
                    }
                });
        }
    });
});
