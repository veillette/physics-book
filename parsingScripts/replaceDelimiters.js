import fs from 'fs';
import path from 'path';

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

function isLikelyLatex(text) {
    const pattern = /\$\$(.*?)\$\$/gs;
    const matches = text.match(pattern);

    let isLikely = true;
    if (matches) {
        for (const match of matches) {
            // Remove the $ delimiters from the match
            const content = match.slice(2, -2);

            // Check if the content contains numbers or simple operations

            // \b\d+(\.\d+)?\b matches a number, either an integer or a decimal.
            // (\s*[-+*/]\s*\d+(\.\d+)?)* matches zero or more occurrences of a simple operation (addition, subtraction, multiplication, or division) followed by a number.
            // \s* matches any number of blank space characters before and after the operation.
            // [-+*/] matches one of the four basic operations: -, +, *, or /.
            // \d+(\.\d+)? matches a number, either an integer or a decimal, following the operation.
            // (_|\^) matches either an underscore (_) or a caret (^) character.
            // \{.*?\} matches the content inside curly braces, representing a subscript or superscript.
            if (/\b\d+(\.\d+)?(\s*[-+*/=]\s*\d+(\.\d+)?)*(_\^)\{.*?\}\b/.test(content)) {
                isLikely = isLikely && true; // Likely LaTeX
            } else// Check if the content contains any common LaTeX commands
            if (/\b(_\^)\b/.test(content)) {
                isLikely = isLikely && true; // Likely LaTeX
            } else
            if (/\b(alpha|kappa|lambda|epsilon|beta|gamma|delta|theta|omega|tau|pi|nu|mu|rho|sigma|Delta|Theta)\b/.test(content)) {
                isLikely = isLikely && true; // Likely LaTeX
            } else if (/\b(prime|circ|left|right|perp|vb|frac|sqrt|array|text|sum|int|cdot|pm|leq|geq|times|rightarrow|tan|sin|cos|log|overline)\b/.test(content)) {
                isLikely = isLikely && true; // Likely LaTeX
            } else {
                isLikely = false; // Not likely LaTeX
            }
        }

        return isLikely;
    } else {
        return true; // not latex tags
    }
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
                const isLatex = isLikelyLatex(content);
                console.log(`file: ${fileName}, isLatex: ${isLatex}`)
                // content = replaceEquationDelimiters(content);
                // content = replaceAllDelimiters(content);

                fs.writeFile(filePath, content, 'utf-8', (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            });
        }
    });
});
