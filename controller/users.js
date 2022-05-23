/* Dependencies / Modules */
const User = require("../models/User"); //link to database
const bcrypt = require("bcrypt"); //performs data hashing
require("dotenv").config();


/* Env */
let salt = +process.env.SALT;


/* [CREATE] */
module.exports.register = (userData) => {

    let {
        firstName,
        lastName,
        email,
        password,
        mobileNo
    } = userData;
    
    let newUser = new User({
		firstName,
		lastName,
		email,
		password: bcrypt.hashSync(password, salt),
		mobileNo,
	});
    
    //save doc in database
    return newUser.save()
        .then(user => user)
        .catch(err => {message: 'Sign up failed'}); 
};



/* [READ] */




/* [UPDATE] */




/* [DELETE] */