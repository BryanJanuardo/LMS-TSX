const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    _id: Number,
    SessionName: String,
    SessionDescription: String,
    SessionStart: Date,
    SessionEnd: Date,
}, {
    collection: 'sessions',
});

module.exports = mongoose.model('Session', sessionSchema);