const express = require("express");
const route = express.Router(); 
const controller = require("../controller/courses");
const auth = require("../auth");

const { verify, verifyAdmin } = auth;

//add new course
route.post("/create", verify, verifyAdmin, (req, res) => {
  controller
		.addCourse(req.body)
		.then((newCourse) => res.send(newCourse))
		.catch((err) => res.send(err.message));
});

//get all courses
route.get("/all", verify, verifyAdmin, (req, res) => {
  controller
    .getAllCourses()
    .then(courses => res.send(courses))
    .catch(err => res.send(err.message));
});

//get all active courses
route.get("/active", (req, res) => {
  controller
    .getAllActiveCourses()
    .then(courses => res.send(courses))
    .catch(err => res.send(err.message));
});

//get specific course
route.get("/:courseId", (req, res) => {
  controller.getCourse(req.params.courseId)
    .then(course => res.send(course))
    .catch(err => res.send(err.message));
});

route.put("/:courseId", verify, verifyAdmin, (req, res) => {
  controller.updateCourse(req.params.courseId, req.body)
    .then(updatedCourse => res.send(updatedCourse))
    .catch(err => res.send(err.message));
});

module.exports = route;