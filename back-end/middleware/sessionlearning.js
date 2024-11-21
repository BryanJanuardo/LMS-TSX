const SessionLearning = require("../models/sessionlearning");
const CourseLearning = require("../models/courselearning");

const validateSessionLearningID = async (req, res, next) => {
  let status = 500;
  const payload = {
    header: `Validation SessionLearningID`,
    message: ``,
    error: ``,
    data: null,
  };
  const { SessionLearningID } = req.params;

  try {
    const sessionLearning = await SessionLearning.findById(SessionLearningID);
    if (sessionLearning) {
      next();
    }
    status = 404;
    payload.message = "SessionLearning not found";
    payload.error = `SessionLearning ${SessionLearningID} Not Found`;
    payload.data = null;
  } catch (error) {
    status = 500;
    payload.message = "Error validating SessionLearningID";
    payload.error = `Error validating SessionLearningID: ${SessionLearningID}`;
    payload.data = null;
    res;
  }

  return res.status(status).json(payload);
};

const validateRelationSessionLearning = async (req, res, next) => {
    let status = 500;
    const payload = {
      header: `Validation Relation SessionLearning`,
      message: ``,
      error: ``,
      data: null,
    };
  const { SessionLearningID, CourseLearningID } = req.params;

  try {
    const courseLearning = await CourseLearning.findOne({
      _id: CourseLearningID,
      SessionLearningID,
    });
    if (courseLearning) {
        next();
    }
    status = 404;
    payload.message = "SessionLearning not found for the given CourseLearning";
    payload.error = `SessionLearning ${SessionLearningID} Not Found for CourseLearning ${CourseLearningID}`;
    payload.data = null;
  } catch (error) {
    status = 500;
    payload.message = "Error validating SessionLearningID";
    payload.error = `Error validating SessionLearningID: ${SessionLearningID} for CourseLearning: ${CourseLearningID}`;
    payload.data = null;
  }

  return res.status(status).json(payload);
};

module.exports = { validateSessionLearningID, validateRelationSessionLearning };
