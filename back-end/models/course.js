const mongoose = require('mongoose');

const course = new mongoose.Schema({
    _id: Number,
    CourseName: String,
    SKS: Number,
}, {
    collection: 'course',
});

module.exports = mongoose.model('Course', course)