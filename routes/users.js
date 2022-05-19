/* Dependencies / Modules */
const express = require("express");
const controller = require("../controller/users");




/* Declare Router */
const route = express.Router(); //contains methods for manipulating data in users collection




/* [CREATE] */
route.post("/register", (req, res) => {
    console.log(req.body);
    // controller.register(req.body)
    //     .then(newUser => res.send(newUser))
    //     .catch(err => "User creation failed");
})


/* [READ] */



/* [UPDATE] */



/* [DELETE] */



/* Export Route */
module.exports = route;