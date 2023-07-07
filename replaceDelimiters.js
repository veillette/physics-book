const fs = require('fs');
const path = require('path');

function replaceEquationDelimiters(text) {
    const pattern = /<div class="equation">(.*?)<\/div>/gs;
    const replacement = (match) => match.replace(/\$\$(.*?)\$\$/gs, ' \\\\\[ $1 \\\\\]');
    return text.replace(pattern, replacement);
}

function replaceAllDelimiters(text) {
    const pattern = /\$\$/g;
    const replacement = '$';
    return text.replace(pattern, replacement);
}

const folderPath = 'contents';

fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    files.forEach((fileName) => {
        if (fileName.endsWith('.md')) {
            const filePath = path.join(folderPath, fileName);

            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }

                let content = data;
                content = replaceEquationDelimiters(content);
                content = replaceAllDelimiters(content);

                fs.writeFile(filePath, content, 'utf-8', (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            });
        }
    });
});
