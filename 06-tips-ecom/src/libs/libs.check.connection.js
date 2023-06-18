const mongoose = require("mongoose");
const os = require("os");
const process = require("process");

const _SECONDS = 5000;
let MAX_INTERVAL = 10;

const countConnection = () => {
  const nbConnection = mongoose.connections.length;
  console.log(`Number of connections: ${nbConnection}`);
};

const checkOverload = () => {
  const intervalId = setInterval(() => {
    console.log("---MAX INTERVAL: ", MAX_INTERVAL);
    if (MAX_INTERVAL === 0) {
      clearInterval(intervalId);
    }
    const nbConnection = mongoose.connections.length;
    const nbCpus = os.cpus().length;
    const memUsage = process.memoryUsage().rss;
    const maxConnections = nbCpus * 5;

    console.log(`Active connections: ${nbConnection}`);
    if (nbConnection > maxConnections) {
      console.log(`Connection overloaded...........`);
    }
    console.log(`Memory usage: ${memUsage / 1024 / 1024} MB`);
    MAX_INTERVAL--;
  }, _SECONDS);
};

module.exports = {
  countConnection,
  checkOverload,
};
