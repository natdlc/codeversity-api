/* Dependencies / Modules */
const User = require("../models/User"); //link to database 

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
        password,
        mobileNo
    });
    
    //save doc in database
    return newUser.save()
        .then(user => user)
        .catch(err => 'Sign up failed'); //assign route
};

/* [READ] */


/* [UPDATE] */


/* [DELETE] */