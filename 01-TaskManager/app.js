require('./db/connect');
const PORT = process.env.PORT || 5000;

// Adding dependencies
const express = require('express');
const task = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();

// Init express app
const app = express();
app.use(express.json());

// Using middleware
app.use('/api/v1/tasks', task);

// Checks if connection to DB succesful, then start app.
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Task Manager app running at port ${PORT}...`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();
