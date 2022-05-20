/* Dependencies / Modules */
const express = require("express");
const controller = require("../controller/users");




/* Declare Router */
const route = express.Router(); 




/* [CREATE] */
route.post("/register", (req, res) => {
    let userData = req.body;
    controller.register(userData)
        .then(newUser => res.send(newUser))
        .catch(err => "User creation failed");
});


/* [READ] */



/* [UPDATE] */



/* [DELETE] */



/* Export Route */
module.exports = route;