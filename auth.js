const jwt = require("jsonwebtoken");


// user defined str data to create JWT
// used in alg for data encryption for security
const secret = "CourseBookingAPI";


/* JWT 
  - securely passes info from one part of server to frontend or other parts of app. 
  - Authorizes users
*/


/* Token creation
  - analogy: pack gift > provide lock with secret code as key
  - if pass is incorrect, token not given
  - if pass is correct, token given
*/


module.exports.createAccessToken = (user) => {
  // HEADER: provided by client

  // PAYLOAD: create obj to contain details of user
  const data = {
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin
  };

  // SIGNATURE: generate JSON web token using jwt.sign()
  return jwt.sign(data, secret, {});
};



/* Token verification 
  - analogy: receive gift > open lock to verify if sender is legit & gift was not tampered with
*/

module.exports.verify = (req, res, next) => {
	let token = req.headers.authorization;

	if (typeof token === "undefined") {
		return res.send({ auth: "failed, no token" });
	} else {
		console.log(token);
		token = token.slice(7, token.length);

		jwt.verify(token, secret, function (err, decodedToken) {
			if (err) {
				return res.send({
					auth: "failed",
					message: err.message,
				});
			} else {
				console.log(decodedToken);
        req.user = decodedToken;
				//user property will be added to request's object and will contain decoded token

				next();
				//lets us proceed to the next middleware
			}
		});
	}
};