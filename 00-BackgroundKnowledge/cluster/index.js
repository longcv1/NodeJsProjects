/*
Worker Thread module:
- Code executed in a worker thread runs in a separate child process, prevent blocking
- Cluser module used to run multiple instance of NodeJS that can distributed workload
- Worker thread module allows running multiple app threads within a single NodeJs instance


Thread pool:
- A few async methods like fs.readFile or crypto.pbkdf2 run on separate thread 
in libuv thread pool.
- Thread pool has 4 threads
- Increase size : process.env.UV_THREADPOOL_SIZE = 5
*/


const http = require("http");
const cluster = require("cluster");
const OS = require('os');
const {Worker} = require("worker_threads");

const server = http.createServer((req, res) => {
  if ("/" === req.url) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Homepage");
  } else if ("/slow-page" === req.url) {
    const worker = new Worker("./worker-thread.js");
    worker.on("message", () => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(`Slow page ${j}`);
    });
  }
});

server.listen(3000, ()=>console.log('listening...'));
