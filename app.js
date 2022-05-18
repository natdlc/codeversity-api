/* Dependencies / Modules */
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv'); //reads .env file



/* Environment Setup */
dotenv.config(); //setup environment
let dbConn = process.env.DB_CONNECTION;
let tester = process.env.ANOTHER_VAL;
console.log(tester);
const port = 4000;



/* Server Setup */
const app = express();



/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



/* Database Connection */
mongoose.connect(dbConn);
let connectStatus = mongoose.connection;
connectStatus.on("error", console.error.bind(console, "connection error"));
connectStatus.once("open", () => console.log("--> Connected to Database"));



/* Backend Routes */





/* Server Gateway Response */
app.listen(port, () => console.log(`--> API hosted on port: ${port}`));