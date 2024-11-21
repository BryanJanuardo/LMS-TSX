const mongoose = require('mongoose');

const userCourseSchema = new mongoose.Schema({
    _id: Number,
    UserID: { type: Number, ref: 'User'},
    CourseLearningID: [{ type: Number, ref: 'CourseLearning' }],
    RoleID: [{ type: Number, ref: 'Role' }],
}, {
    collection: 'usercourses',
});

module.exports = mongoose.model('UserCourse', userCourseSchema);