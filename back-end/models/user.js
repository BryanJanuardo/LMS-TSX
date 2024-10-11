const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: Number,
    UserName: String,
    UserEmail: String,
    UserPassword: String,
    UserDOB: Date,
    UserPhotoPath: String,
}, {
    collection: 'users',
});

module.exports = mongoose.model('User', userSchema);