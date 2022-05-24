/* Dependencies / Modules */
const User = require("../models/User"); //link to database
const Course = require("../models/Course");
const bcrypt = require("bcrypt"); //performs data hashing
require("dotenv").config();
const auth = require("../auth");

/* Env */
let salt = +process.env.SALT;

/* user reg */
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

/* user auth
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
			const isPasswordCorrect = bcrypt.compareSync(
				data.password,
				result.password
			);

			if (isPasswordCorrect) {
				return {
					accessToken: auth.createAccessToken(result.toObject()),
				};
			} else {
				return false;
			}
		}
	});
};

/* enroll user to course */
module.exports.enroll = async (req, res) => {
	if (req.user.isAdmin) {
		return res.send({ message: "Action forbidden" });
	} else {
		let userUpdated = await User.findById(req.user.id)
			.then((user) => {
				let newCourse = {
					courseId: req.body.courseId,
				};
				user.enrollments.push(newCourse);
				return user
					.save()
					.then((result) => result)
					.catch((err) => err.message);
			})
			.catch((err) => res.send(err.message));

		let courseUpdated = await Course.findById(req.body.courseId)
			.then((course) => {
				let newEnrollee = {
					userId: req.user.id,
				};
				course.enrollees.push(newEnrollee);
				return course
					.save()
					.then((result) => result)
					.catch((err) => err.message);
			})
			.catch((err) => res.send(err.message));

		if (userUpdated && courseUpdated) {
			res.send({ message: "Enrollment successful" });
		} else {
			res.send({ message: "Enrollment unsuccessful" });
		}
	}
};

/* get auth profile 
    - find doc in db using user id
    - reassign password of returned doc to empty string
    - return result to client
*/
module.exports.getProfile = (data) => {
	return User.findById(data)
		.then((result) => {
			result.password = "";
			return result;
		})
		.catch((err) => err.message);
};

/* get user enrollments */
module.exports.getEnrollments = (req, res) => {
	User.findById(req.user.id)
		.then((result) => res.send(result.enrollments))
		.catch((err) => res.send(err));
};

/* [UPDATE] */

/* [DELETE] */
