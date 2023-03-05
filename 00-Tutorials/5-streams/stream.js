const fs = require('fs');
const zlib = require('zlib');
const gzip = zlib.createGzip();

const rs = fs.createReadStream('./4-files/test.txt', {encoding: 'utf-8'});
const ws = fs.createWriteStream('./4-files/write_stream.txt');
const compressed = fs.createWriteStream('./4-files/test.txt.gz');

// Solution 1: Using stream event emitter
// rs.on('data', (chunk) => {
//     ws.write(chunk);
// })

// Solution 2: More efficentcy using pipe
rs.pipe(ws);
rs.pipe(gzip).pipe(compressed);

/**
 * Tech-01: Using streams to make static web server
 * => Problem: You want to send a file from a web server to a client in an efficient manner that will scale up to large files
 * ==> Solution: Use fs.createReadStream to open a file and stream it to the client
 */
const  http = require('http');
http.createServer(function(req, res) {
    res.writeHead(200, { 'content-encoding': 'gzip' });
    fs.createReadStream(__dirname + '/index.html')
    .pipe(zlib.createGzip())
    .pipe(res);
}).listen(8000);