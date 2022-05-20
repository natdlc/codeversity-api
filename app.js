/* Dependencies / Modules */
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv"); //reads .env file
const userRoutes = require("./routes/users");


/* Environment Setup */
dotenv.config(); //setup environment
let acct = process.env.CRED;
const port = process.env.PORT;


/* Server Setup */
const app = express();
app.use(express.json()); //middleware


/* Database Connection */
mongoose.connect(acct);
let connectStatus = mongoose.connection;
connectStatus.once("open",
    () => console.log("--> Connected to Database"));


/* Backend Routes */
app.use("/users", userRoutes);


/* Server Gateway Response */
app.get("/",
    (req, res) => res.send("Welcome to Codeversity"));

app.listen(port,
    () => console.log(`--> API hosted on port: ${port}`));