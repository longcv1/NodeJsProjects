/**
 * Dependencies
 */
require("dotenv").config();
// require('express-async-errors')
const ErrorHandlerMiddleware = require("./middlewares/error-handler");
const NotFoundMiddleware = require("./middlewares/not-found");
const AuthRouter = require('./routes/auth');
const JobRouter = require('./routes/jobs');
const connectDB = require('./db/connect')

/**
 * Init express
 */
const express = require("express");
const app = express();
app.use(express.json());

const authentication = require('./middlewares/authentication');

/**
 * Routes
 */
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/jobs',authentication, JobRouter);

/**
 * Middlewares
 */
app.use(NotFoundMiddleware);
app.use(ErrorHandlerMiddleware);

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    // Connect database
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is running at ${port}...`));
  } catch (error) {
     console.log(error);
  }
};

start();
