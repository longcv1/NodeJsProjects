const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('^/$|index(.html)?', (req, res) => {
    res.statusCode(200);
    res.send({message: 'Home Page'});
})

app.get('/new-page(.html)?', (req, res) => {
    res.statusCode(200);
    res.send({message: 'new-page'});
})

app.get('/*', (req, res) => {
    res.statusCode(404);
    res.send({message: 'Not found....'});
})


app.listen(PORT, () => console.log('Listening port: ', PORT));