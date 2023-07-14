const simpleGit = require('simple-git');
const fs = require('fs');

// Specify the path to your Git repository
const repoPath = '..';

// Create a new simple-git instance
const git = simpleGit(repoPath);

// Restore all files within the 'contents' directory
restoreFiles('contents');
restoreFiles('resources');

function restoreFiles(directory) {
    git.checkout('HEAD', [`${directory}/*`], (error) => {
        if (error) {
            console.error('An error occurred while restoring files:', error);
        } else {
            console.log('Files restored successfully.');
        }
    });

    // Get the list of Git tracked files
    git.status((err, status) => {
        if (err) {
            console.error('An error occurred while getting Git status:', err);
            return;
        }

        // Filter non-tracked files
        const nonTrackedFiles = status.files
            .filter(file => file.path() && file.index === '?' && file.working_dir === '?')
            .map(file => file.path());

        // Delete non-tracked files
        nonTrackedFiles.forEach(file => {
            const filePath = `${directory}/${file}`;
            fs.unlink(filePath, (error) => {
                if (error) {
                    console.error(`Failed to delete file ${filePath}:`, error);
                } else {
                    console.log(`Deleted file: ${filePath}`);
                }
            });
        });
    });
}
