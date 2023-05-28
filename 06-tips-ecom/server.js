const app = require('./src/app');
const PORT = 5000;


const server = app.listen(PORT, () => {
    console.log('My app listening port:', PORT);
});

process.on("SIGINT", () => {
    server.close(() => console.log('Exit server'));
});
