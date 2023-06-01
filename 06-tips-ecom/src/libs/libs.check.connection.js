const mongoose = require('mongoose');

const countConnection = () => {
    const nbConnection = mongoose.connections.length;
    console.log(`Number of connections: ${nbConnection}`);
};

module.exports = {
    countConnection,
}