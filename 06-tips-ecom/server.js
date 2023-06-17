const app = require('./src/app');
require('dotenv').config();
const PORT = process.env.DEV_APP_PORT || 3000;

const server = app.listen(PORT, () => {
    console.log('My app listening port:', PORT);
});

process.on("SIGINT", () => {
    server.close(() => console.log('Exit server'));
});
