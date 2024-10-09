const mongoose = require('mongoose');

const courseLearningSchema = new mongoose.Schema({
    _id: Number,
    SessionLearningID: mongoose.Schema.Types.ObjectId, ref: 'SessionLearning',
    CourseID: mongoose.Schema.Types.ObjectId, ref: 'Course',
}, {
    collection: 'courselearnings',
});

module.exports = mongoose.model('CourseLearning', courseLearningSchema);