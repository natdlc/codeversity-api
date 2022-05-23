const jwt = require("jsonwebtoken");

const secret = "CourseBookingAPI";



module.exports.createAccessToken = (user) => {

  const data = {
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin
  };

  return jwt.sign(data, secret, {});
};


// user
module.exports.verify = (req, res, next) => {
	let token = req.headers.authorization;

  if (typeof token === "undefined") {
		return res.send({ auth: "failed, no token" });
  } else {
		token = token.slice(7, token.length);
		jwt.verify(token, secret, function (err, decodedToken) {
      if (err) {
				return res.send({
					auth: "failed",
					message: err.message,
				});
      } else {
        req.user = decodedToken;
				next();
			}
		});
  };
};


// verify admin, also a middleware
module.exports.verifyAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    return res.send({
      auth: "failed",
      message: "action forbidden"
    });
  };
};