const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    _id: Number,
    CourseName: String,
    SKS: Number,
}, {
    collection: 'courses',
});

module.exports = mongoose.model('Course', courseSchema);