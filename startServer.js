const {exec} = require('child_process');

// Specify the directory you want to serve
const directory = '/c/Users/veillette/physics-book';

// Specify the port number you want to use for the server
const port = 8081;

const url = '127.0.0.1';

// Start the HTTP server using http-server package
const startServer = () => {
    exec(`http-server -a ${url} -p ${port} ${directory}`, (error) => {
        if (error) {
            console.error('Error starting the HTTP server:', error);
        } else {
            console.log(`HTTP server is running at http://localhost:${port}`);
        }
    });
};

startServer();
