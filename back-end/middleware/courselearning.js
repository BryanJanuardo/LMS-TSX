const CourseLearning = require("../models/courselearning");
const UserCourse = require("../models/usercourse");

const validateCourseLearningID = async (req, res, next) => {
  let status = 500;
  const payload = {
    header: `Validation CourseLearningID`,
    message: ``,
    error: ``,
    data: null,
  };
  const { CourseLearningID } = req.params;

  try {
    const courseLearning = await CourseLearning.findById(CourseLearningID);
    if (courseLearning) {
      next();
    }
    status = 404;
    payload.message = "CourseLearning not found";
    payload.error = `CourseLearning ${CourseLearningID} Not Found`;
    payload.data = null;
  } catch (error) {
    status = 500;
    payload.message = "Error validating CourseLearningID";
    payload.error = `Error validating CourseLearningID: ${CourseLearningID}`;
    payload.data = null;
  }

  return res.status(status).json(payload);
};

const validateRelationCourseLearning = async (req, res, next) => {
  let status = 500;
  const payload = {
    header: `Validation Relation CourseLearning`,
    message: ``,
    error: ``,
    data: null,
  };
  const { UserCourseID, CourseLearningID } = req.params;
  
  try {
    const userCourse = await UserCourse.findOne({
      _id: UserCourseID,
      CourseLearningID,
    });

    if (userCourse) {
      next();
    }
    status = 404;
    payload.message = "CourseLearning not found for the given UserCourse";
    payload.error = `CourseLearning ${CourseLearningID} Not Found for UserCourse ${UserCourseID}`;
    payload.data = null;
  } catch (error) {
    status = 500;
    payload.message = "Error validating CourseLearning";
    payload.error = `Error validating CourseLearning: ${CourseLearningID} for UserCourse: ${UserCourseID}`;
    payload.data = null;
  }

  return res.status(status).json(payload);
};

module.exports = { validateCourseLearningID, validateRelationCourseLearning };
