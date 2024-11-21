var express = require("express");
var router = express.Router({ mergeParams: true });

const CourseLearning = require("../models/courselearning");

// get all
router.get("/", async (req, res) => {
  let status = 500;
  const payload = { header: `Fetch All CourseLearning`, message: ``, error: ``, data: null};
  
  try {
    const courseLearning = await CourseLearning.find()
      .populate("CourseID")
      .populate([
        {
          path: "SessionLearningID",
          populate: [
            { path: "SessionID", model: "Session" },
            { path: "MaterialID", model: "Material" },
            { path: "TaskID", model: "Task" },
          ],
        },
      ]);

    status = 200;
    payload.message = `Successfully to fetch all CourseLearning`;
    payload.data = courseLearning;
  } catch (error) {
    status = 500;
    payload.message = `Failed to fetch all CourseLearning`;
    payload.error = `Error to fetch all CourseLearning`;
    payload.data = null;
  }

  return res.status(status).json(payload);
});

// get by id
router.get("/:CourseLearningID", async (req, res) => {
  let status = 500;
  const payload = { header: `Fetch CourseLearning By CourseLearningID`, message: ``, error: ``, data: null };
  const courseLearningId = req.params.CourseLearningID;

  try {
    const courseLearning = await CourseLearning.findById(courseLearningId)
      .populate("CourseID")
      .populate([
        {
          path: "SessionLearningID",
          populate: [
            { path: "SessionID", model: "Session" },
            { path: "MaterialID", model: "Material" },
            { path: "TaskID", model: "Task" },
          ],
        },
      ]);

    if (!courseLearning) {
      status = 404;
      payload.message = `Failed to fetch CourseLearning`;
      payload.error = `CourseLearning ${courseLearningId} Not Found`;
      payload.data = null;
    }else {
      status = 200;
      payload.message = `Successfully to fetch CourseLearning`;
      payload.data = courseLearning;
    }

  } catch (error) {
    status = 500;
    payload.message = `Failed to fetch CourseLearning`;
    payload.error = `Error to fetch CourseLearning By CourseLearningID: ${courseLearningId}`;
    payload.data = null;
  }

  return res.status(status).json(payload);
});

// create
router.post("/", async (req, res) => {
  let status = 500;
  const payload = { header: `Create New CourseLearning`, message: ``, error: ``, data: null };

  try {
    const lastCourseLearning = await CourseLearning.findOne({}, {}, { sort: { _id: -1 } });
    const newCourseLearningId = lastCourseLearning ? lastCourseLearning._id + 1 : 1;
    await CourseLearning.create({
      _id: newCourseLearningId,
      CourseID: req.body.CourseID,
      SessionLearningID: req.body.SessionLearningID,
    });

    status = 201;
    payload.message = `Successfully to create new CourseLearning`;
    payload.data = null;
  } catch (error) {
    status = 500;
    payload.message = `Failed to create CourseLearning`;
    payload.error = `Error to create new CourseLearning`;
    payload.data = null;
  }

  return res.status(status).json(payload);
});

// update
router.put("/:CourseLearningID", async (req, res) => {
  let status = 500;
  const payload = { header: `Update CourseLearning`, message: ``, error: ``, data: null };
  const courseLearningId = req.params.CourseLearningID;

  try {
    const currCourseLearning = await CourseLearning.findByIdAndUpdate(
      courseLearningId,
      req.body,
      { new: true }
    );

    if (!currCourseLearning) {
      status = 404;
      payload.message = `Failed to update CourseLearning`;
      payload.error = `CourseLearning ${courseLearningId} Not Found`;
      payload.data = null;
    }else{
      status = 200;
      payload.message = `Successfully to update CourseLearning`;
      payload.data = null;
    }
  } catch (error) {
    status = 500;
    payload.message = `Failed to update CourseLearning`;
    payload.error = `Error to update CourseLearning By CourseLearningID: ${courseLearningId}`;
    payload.data = null;
  }

  return res.status(status).json(payload);
});

// delete
router.delete("/:CourseLearningID", async (req, res) => {
  let status = 500;
  const payload = { header: ``, message: ``, data: null };
  const courseLearningId = req.params.CourseLearningID;

  try {
    const currCourseLearning = await CourseLearning.findByIdAndDelete(courseLearningId);
    if (!currCourseLearning) {
      status = 404;
      payload.message = `Failed to delete CourseLearning`;
      payload.error = `CourseLearning ${courseLearningId} Not Found`;
      payload.data = null;
    }else {
      status = 200;
      payload.message = `Successfully to delete CourseLearning`;
      payload.data = null;
    }
  } catch (error) {
    status = 500;
    payload.message = `Failed to delete CourseLearning`;
    payload.error = `Error to delete CourseLearning By CourseLearningID: ${courseLearningId}`;
    payload.data = null;
  }

  return res.status(status).json(payload);
});

module.exports = router;
