const app = require('./src/app');
require('dotenv').config();
const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
    console.log('My app listening port:', PORT);
});

process.on("SIGINT", () => {
    server.close(() => console.log('Exit server'));
});
