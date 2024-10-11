const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema({
    _id: Number,
    ForumTitle: String,
    ForumDescription: String,
    SessionID: mongoose.Schema.Types.ObjectId, ref: 'Session',
    ForumID: mongoose.Schema.Types.ObjectId, ref: 'Forum',
    CreatedDate: Date,
    FilePath: String,
    UserID: mongoose.Schema.Types.ObjectId, ref: 'User',
}, {
    collection: 'forums',
});

module.exports = mongoose.model('Forum', forumSchema);