const fs = require('fs');
const path = require('path');

function replaceEquationDelimiters(text) {
    const pattern = /<div class="equation">(.*?)<\/div>/g;
    const replacement = (match) => match.replace(/\$(.*?)\$/g, '$$$1$$');
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
                content = replaceAllDelimiters(content);
                content = replaceEquationDelimiters(content);

                fs.writeFile(filePath, content, 'utf-8', (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            });
        }
    });
});
