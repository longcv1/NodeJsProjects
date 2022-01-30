require("dotenv").config();
// require('express-async-errors')

const express = require("express");
const app = express();

const ErrorHandlerMiddleware = require("./middlewares/error-handler");
const NotFoundMiddleware = require("./middlewares/not-found");

app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("job-api");
});

//app.use(NotFoundMiddleware);
//app.use(ErrorHandlerMiddleware);

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    app.listen(port, console.log("Server is running at ${port}..."));
  } catch (error) {
     console.log(error);
  }
};

start();
