// server.js
const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain');

    if (req.url === '/') {
        res.statusCode = 200;
        res.end('Welcome to Node Server');
    } else if (req.url === '/about') {
        res.statusCode = 200;
        res.end('About Page');
    } else if (req.url === '/contact') {
        res.statusCode = 200;
        res.end('Contact Page');
    } else {
        res.statusCode = 404;
        res.end('404 Error Message');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Run: node server.js`);
    console.log(`Server is running at http://localhost:${PORT}/`);
});
