/* Dependencies / Modules */
const mongoose = require("mongoose");

/* Schema */
const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		default: "",
	},
	lastName: {
		type: String,
		default: "",
	},
	email: {
		type: String,
		required: [true, "Email Address is Required"],
	},
	password: {
		type: String,
		required: [true, "Password is Required"],
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	mobileNo: {
		type: String,
		default: "",
	},
	enrollments: [
		{
			courseId: {
				type: String,
				required: [true, "Course ID is Required"],
			},
			enrolledOn: {
				type: Date,
				default: new Date(),
			},
			status: {
				type: String,
				default: "Pending", //failed, pending, success
			},
		},
	],
});

/* Models */
module.exports = mongoose.model("User", userSchema);
