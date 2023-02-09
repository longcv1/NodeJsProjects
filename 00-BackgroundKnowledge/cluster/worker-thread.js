const { parentPort } = require('worker_threads')

let j=0; let i;
for (i = 0; i < 6000000000; i++) {
  j++;
}

parentPort.postMessage(j);