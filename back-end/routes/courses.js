var express = require("express");
var router = express.Router({ mergeParams: true });

const Course = require("../models/course");

// get all
router.get("/", async (req, res) => {
  let status = 500;
  const payload = { header: `Fetch All Courses`, message: ``, error: ``, data: null };

  try {
    const courses = await Course.find();
    status = 200;
    payload.message = `Successfully fetched all courses`;
    payload.data = courses;
  } catch (error) {
    status = 500;
    payload.message = `Failed to fetch all courses`;
    payload.error = `Error fetching all courses`;
  }

  return res.status(status).json(payload);
});

// get by id
router.get("/:CourseID", async (req, res) => {
  let status = 500;
  const payload = { header: `Fetch Course By ID`, message: ``, error: ``, data: null };
  const courseId = req.params.CourseID;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      status = 404;
      payload.message = `Failed to fetch course`;
      payload.error = `Course ${courseId} not found`;
    } else {
      status = 200;
      payload.message = `Successfully fetched course`;
      payload.data = course;
    }
  } catch (error) {
    status = 500;
    payload.message = `Failed to fetch course`;
    payload.error = `Error fetching course by ID: ${courseId}`;
  }

  return res.status(status).json(payload);
});

// create
router.post("/", async (req, res) => {
  let status = 500;
  const payload = { header: `Create New Course`, message: ``, error: ``, data: null };

  try {
    const lastCourse = await Course.findOne({}, {}, { sort: { _id: -1 } });
    const newCourseId = lastCourse ? lastCourse._id + 1 : 1;
    await Course.create({
      _id: newCourseId,
      CourseName: req.body.CourseName,
      CourseDescription: req.body.CourseDescription,
      SKS: req.body.SKS,
    });

    status = 201;
    payload.message = `Successfully created new course`;
    payload.data = null;
  } catch (error) {
    status = 500;
    payload.message = `Failed to create course`;
    payload.error = `Error creating new course`;
  }

  return res.status(status).json(payload);
});

// update
router.put("/:CourseID", async (req, res) => {
  let status = 500;
  const payload = { header: `Update Course`, message: ``, error: ``, data: null };
  const courseId = req.params.CourseID;

  try {
    const updatedCourse = await Course.findByIdAndUpdate(courseId, req.body, { new: true });

    if (!updatedCourse) {
      status = 404;
      payload.message = `Failed to update course`;
      payload.error = `Course ${courseId} not found`;
    } else {
      status = 200;
      payload.message = `Successfully updated course`;
      payload.data = updatedCourse;
    }
  } catch (error) {
    status = 500;
    payload.message = `Failed to update course`;
    payload.error = `Error updating course by ID: ${courseId}`;
  }

  return res.status(status).json(payload);
});

// delete
router.delete("/:CourseID", async (req, res) => {
  let status = 500;
  const payload = { header: `Delete Course`, message: ``, error: ``, data: null };
  const courseId = req.params.CourseID;

  try {
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      status = 404;
      payload.message = `Failed to delete course`;
      payload.error = `Course ${courseId} not found`;
    } else {
      status = 200;
      payload.message = `Successfully deleted course`;
      payload.data = deletedCourse;
    }
  } catch (error) {
    status = 500;
    payload.message = `Failed to delete course`;
    payload.error = `Error deleting course by ID: ${courseId}`;
  }

  return res.status(status).json(payload);
});

module.exports = router;
