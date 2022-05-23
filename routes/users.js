/* Dependencies / Modules */
const express = require("express");
const controller = require("../controller/users");
const auth = require("../auth");

/* Declare Router */
const route = express.Router(); 




/* [CREATE] */
route.post("/register", (req, res) => {
    let userData = req.body;
    controller.register(userData)
        .then(newUser => res.send(newUser))
        .catch(err => "User creation failed");
});




/* [CREATE] User Auth */
route.post("/login", (req, res) => {
    controller.loginUser(req.body)
        .then(result => res.send(result))
        .catch(err => res.send(err.message));
});




/* [READ] */
route.get("/details", auth.verify, (req, res) => {
    controller.getProfile(req.user.id)
        .then(result => res.send(result))
        .catch(err => res.send(err.message));
});


/* [UPDATE] */



/* [DELETE] */



/* Export Route */
module.exports = route;