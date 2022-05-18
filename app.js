/* Dependencies / Modules */
const express = require("express");
const mongoose = require("mongoose");


/* Environment Setup */
const port = 4000;


/* Server Setup */
const app = express();


/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/* Database Connection */
mongoose.connect(
	"mongodb+srv://natcorpuz:admin123@cluster0.yso0q.mongodb.net/?retryWrites=true&w=majority"
);

let connectStatus = mongoose.connection;
connectStatus.on("error", console.error.bind(console, "connection error"));
connectStatus.once("open", () => console.log("--> Connected to Database"));

/* Backend Routes */


/* Server Gateway Response */
app.listen(port, () => console.log(`--> API hosted on port: ${port}`));