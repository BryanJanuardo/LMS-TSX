const mongoose = require('mongoose');

const courseLearningSchema = new mongoose.Schema({
    _id: Number,
    ClassName: String,
    SessionLearningID: [{ type: Number, ref: 'SessionLearning' }],
    CourseID: { type: Number, ref: 'Course'},
}, {
    collection: 'courselearnings',
});

module.exports = mongoose.model('CourseLearning', courseLearningSchema);