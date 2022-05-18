// [SECTION] Dependencies / Modules
const express = require("express");
const mongoose = require("mongoose");

// [SECTION] Environment Setup
const port = 4000;

// [SECTION] Server Setup
const app = express();

// [SECTION] Database Connection
// mongoose.connect(
// 	"mongodb+srv://natcorpuz:admin123@cluster0.yso0q.mongodb.net/toDo176?retryWrites=true&w=majority",
// 	{
// 		//avoids deprecation warnings because of connection issues
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	}
// );

// [SECTION] Backend Routes


// [SECTION] Server Gateway Response
app.listen(port, ()=>console.log(`API hosted on port: ${port}`))