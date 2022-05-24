const Course = require("../models/Course");

module.exports.addCourse = (data) => {
	let { name, description, price } = data;

	let newCourse = new Course({ name, description, price });

	return newCourse
		.save()
		.then((course) => course)
		.catch((err) => {
			message: err.message;
		});
};

module.exports.getAllCourses = () => {
	return Course.find({})
		.then((courses) => courses)
		.catch((err) => err.message);
};

module.exports.getAllActiveCourses = () => {
	return Course.find({ isActive: true })
		.then((courses) => courses)
		.catch((err) => err.message);
};

module.exports.getCourse = (courseId) => {
	return Course.findById(courseId)
		.then((course) => course)
		.catch((err) => err.message);
};

module.exports.updateCourse = (courseId, data) => {
	let updatedCourse = {
		name: data.name,
		description: data.description,
		price: data.price,
		isActive: data.isActive,
	};

	return Course.findByIdAndUpdate(courseId, updatedCourse)
		.then((newCourse) => newCourse)
		.catch((err) => err.message);
};

module.exports.archiveCourse = (courseId) => {
	return Course.findByIdAndUpdate(courseId, { isActive: false })
		.then(() => {
			return { message: "SUCCESS: Course archived" };
		})
		.catch((err) => err.message);
};
