const express = require("express");
// const bodyParser = require('body-parser');

// to access the env file
require('dotenv').config()

const app = express();

// to ensure the database connection
const con = require("./db");

// importing routes
const userRoute = require('./routes/userRoute');

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use('/accounts', userRoute);


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server started at port http://localhost:${port}`);
});