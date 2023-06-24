const express = require('express');
const morgan = require('morgan');
const { default: helmet } = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const {countConnection, checkOverload} = require('./libs/libs.check.connection');
const router = require('./routes');

//init app using express
const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//===== MIDDLEWARES =====//
app.use(morgan('dev'));
app.use(helmet());
app.use(compression())

//===== DATABASE =====//
require('./db/db.init.mongo');
//countConnection();
//checkOverload();

//===== ROUTES =====//
app.use('/api/v1', router);

//===== ERRORS HANDLING =====//
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server Error'
    });
});

module.exports = app;