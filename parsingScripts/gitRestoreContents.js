const simpleGit = require('simple-git');

// Specify the path to your Git repository
const repoPath = '';

// Create a new simple-git instance
const git = simpleGit(repoPath);

// Restore all files within the 'contents' directory
git.checkout('HEAD', ['contents/*'], (error) => {
    if (error) {
        console.error('An error occurred while restoring files:', error);
    } else {
        console.log('Files restored successfully.');
    }
});
