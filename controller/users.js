/* Dependencies / Modules */
const User = require("../models/User"); //link to database
const bcrypt = require("bcrypt"); //performs data hashing
require("dotenv").config();


/* Env */
let salt = +process.env.SALT;


/* [CREATE] */
module.exports.register = (userData) => {

    let firstName = userData.firstName;
    let lastName = userData.lastName;
    let email = userData.email;
    let password = userData.password;
    let mobileNo = userData.mobileNo;
    
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
        .catch(err => 'Sign up failed'); //assign route
};



/* [READ] */




/* [UPDATE] */




/* [DELETE] */





/* NOTES 

- bcrypt.hashSync(data, salt);
    - data === data to be hashed
    - salt === # of rounds encryption is processed

*/