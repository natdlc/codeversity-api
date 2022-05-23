/* Dependencies / Modules */
const User = require("../models/User"); //link to database
const bcrypt = require("bcrypt"); //performs data hashing
require("dotenv").config();
const auth = require("../auth");
const { findOne } = require("../models/User");

/* Env */
let salt = +process.env.SALT;

/* [CREATE] */
module.exports.register = (userData) => {
	let { firstName, lastName, email, password, mobileNo } = userData;

	let newUser = new User({
		firstName,
		lastName,
		email,
		password: bcrypt.hashSync(password, salt),
		mobileNo,
	});

	//save doc in database
	return newUser
		.save()
		.then((user) => user)
		.catch((err) => {
			message: "Sign up failed";
		});
};

/* [CREATE] jwt token for user auth
    - check db if user email exists
    - compare password
    - generate jwt if user logins successfully
    - return false if user logins unsuccessfully
*/
module.exports.loginUser = (data) => {
	// findOne returns 1st record in collection that matches criteria

	return User.findOne({ email: data.email }).then((result) => {
		if (result == null) {
			return false;
		} else {
            const isPasswordCorrect =
                bcrypt.compareSync(
                    data.password,
                    result.password
                );
            
            if (isPasswordCorrect) {
                return {
                    accessToken: auth.createAccessToken(result.toObject())
                };
            } else {
                return false;
            }
		}
	});
};

/* [READ] 
    - find doc in db using user id
    - reassign password of returned doc to empty string
    - return result to client
*/
module.exports.getProfile = (data) => {
    return User.findById(data)
        .then(result => {
            // change value of password to empty string
            result.password = '';
            return result;
        })
        .catch(err => err.message);
}

/* [UPDATE] */

/* [DELETE] */
