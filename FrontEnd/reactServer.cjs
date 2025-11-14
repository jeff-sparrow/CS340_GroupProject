// ChatGPT was used in this project to generate template React components
// The templates were adapted to the specific use cases for this project


// reactServer.cjs
// Uses common JavaScript to serve the React build folder (/dist)

const express = require('express');
const path = require('path');
const app = express();

// We will simply hardcode the react PORT, but normally this should be inside .env
const PORT = 22543;

// Serve the static files from the React app located in the build folder '/dist'
// React router will take over frontend routing
app.use(express.static(path.join(__dirname, 'dist')));

// Handles any requests that don't match the ones above to return the React app
// A request to '/nonExist' will redirect to the index.html where react router takes over at '/'
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server running: http://classwork.engr.oregonstate.edu:${PORT}...`);
});