/* Dependencies / Modules */
const mongoose = require("mongoose");



/* Schema */
const courseSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: [true, "Course Name is Required"]
    },
    description: {
        type: String,
        required: [true, "Description is Required"]
    },
    price: {
        type: Number,
        required: [true, "Price is Required"]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    enrollees: [
        {
            userId: {
                type: String,
                required: [true, 'UserID is Required']
            },
            enrolledOn: {
                type: Date,
                default: new Date()
            }
        }
    ]
   
});



/* Models
    - provides interface for API to communicate to MongoDB
*/
module.exports = mongoose.model("Course", courseSchema);
