/* Dependencies / Modules */
const mongoose = require("mongoose");



/* Schema */
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is Required"],
    },
    lastName: {
        type: String,
        required: [true, "Last Name is Required"],
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
        default: false
    },
    mobileNo: {
        type: String,
        required: [true, 'Mobile Number is Required']
    },
    enrollments: [
        {
            //every doc stored describes a course that a user is enrolled in
            courseId: {
                type: String,
                required: [true, 'Course ID is Required']
            },
            enrolledOn: {
                type: Date,
                default: new Date() //generates date data
            }, //date enrolled
            status: {
                type: String,
                default: 'Pending'
            } //enrollment status (failed, pending, success)
        }
    ]
});



/* Models
    - provides interface for API to communicate to MongoDB
*/
module.exports = mongoose.model("User", userSchema);