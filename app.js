/* Dependencies / Modules */
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/users");
const courseRoutes = require("./routes/courses");
const cors = require("cors");

/* Environment Setup */
dotenv.config();
let acct = process.env.CRED;
const port = process.env.PORT;

/* Server Setup */
const app = express();
app.use(express.json());
app.use(cors()); // enables all origins / URL of client request

/* Database Connection */
mongoose.connect(acct);
let connectStatus = mongoose.connection;
connectStatus.once("open", () => console.log("--> Connected to Database"));

/* Backend Routes */
app.use("/users", userRoutes);
app.use("/courses", courseRoutes);

/* Server Gateway Response */
app.get("/", (req, res) => res.send("Welcome to Codeversity"));

app.listen(port, () => console.log(`--> API hosted on port: ${port}`));
