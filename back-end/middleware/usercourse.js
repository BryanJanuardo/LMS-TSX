const UserCourse = require("../models/usercourse");

const validateUserCourseID = async (req, res, next) => {
  let status = 500;
  const payload = {
    header: `Validation UserCourseID`,
    message: ``,
    error: ``,
    data: null,
  };
  const { UserCourseID } = req.params;
  
  try {
    const userCourse = await UserCourse.findById(UserCourseID);
    if (userCourse) {
      next();
    }
    status = 404;
    payload.message = "UserCourse not found";
    payload.error = `UserCourse ${UserCourseID} Not Found`;
    payload.data = null;
  } catch (error) {
    status = 500;
    payload.message = "Error validating UserCourseID";
    payload.error = `Error validating UserCourseID: ${UserCourseID}`;
    payload.data = null;
  }

  return res.status(status).json(payload);
};

module.exports = { validateUserCourseID };
