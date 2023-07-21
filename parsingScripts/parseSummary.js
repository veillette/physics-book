const fs = require('fs');

// Function to extract information from the markdown
function extractInfo(markdown) {
    const lines = markdown.split('\n');
    const chapterRegex = /^(\d+)\.\s*{: \s*.chapter\s*}\s*\[(.+)\]\(([^)]+)\)/;
    const sectionRegex = /^\s*(\d+)\.\s*{: \s*.section\s*}\s*\[(.+)\]\(([^)]+)\)/;

    let chapters = [];
    let currentChapter = {};

    for (const line of lines) {
        const chapterMatch = line.match(chapterRegex);


        if (chapterMatch) {

            // console.log('line:', chapterMatch);
            if (currentChapter.title) chapters.push(currentChapter);
            const chapterNumber = parseInt(chapterMatch[1]) - 1;
            const chapterTitle = chapterMatch[2];
            const chapterFile = chapterMatch[3];
            currentChapter = {
                chapterNumber,
                chapterTitle,
                chapterFile,
                sections: []
            };

            chapters.push(currentChapter);
        } else {
            const sectionMatch = line.match(sectionRegex);

            // console.log('line:', sectionMatch);
            if (sectionMatch) {
                const sectionNumber = parseInt(sectionMatch[1]);
                const sectionTitle = sectionMatch[2];
                const sectionFile = sectionMatch[3];
                currentChapter.sections.push({sectionNumber, sectionTitle, sectionFile});
            }
        }
    }

    return chapters;
}

// Function to write the JSON to a file
function writeToJson(chapters, outputFilePath) {
    const data = JSON.stringify(chapters, null, 2);
    fs.writeFileSync(outputFilePath, data, 'utf8');
}

// Read the markdown file
fs.readFile('../SUMMARY.md', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the markdown file:', err);
        return;
    }

    // Extract information from the markdown
    const chapters = extractInfo(data);

    // Write the JSON to a file
    const outputFilePath = '../summary.json';
    console.log('Writing JSON file:', chapters);
    writeToJson(chapters, outputFilePath);

    console.log('JSON file created successfully:', outputFilePath);
});
