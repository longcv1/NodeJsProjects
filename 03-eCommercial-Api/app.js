/**
 * Add Dependencies
 */
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const connectDB = require("./db/connect");
const NotFoundHandler = require("./middleware/not-found");
const ErrorHandler = require("./middleware/error-handler");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileUpload");
const authRouter = require("./routes/AuthRoute");
const userRouter = require("./routes/UserRoute");
const productRouter = require("./routes/ProductRoute");
const reviewRouter = require("./routes/ReviewRoute");
const orderRouter = require("./routes/OrderRoute");

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static("./public"));
app.use(fileUpload());

/**
 * Routes
 */
app.get("/v1/api", (req, res) => {
  res.send("Demo App eCommercial Api");
});
app.use("/v1/api/auth", authRouter);
app.use("/v1/api/users", userRouter);
app.use("/v1/api/products", productRouter);
app.use("/v1/api/reviews", reviewRouter);
app.use('/v1/api/orders', orderRouter);

/**
 * Use Middleware
 * These functions will be invoked if the routes are existed.
 */
app.use(NotFoundHandler);
app.use(ErrorHandler);

const port = process.env.PORT || 5000;
const start = async () => {
  await connectDB(process.env.MONGO_URL);
  console.log("Connection DB is OK!");
  app.listen(port, console.log(`Running at port ${port}...`));
};

start();
