const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema({
    _id: Number,
    ForumTitle: String,
    ForumDescription: String,
    SessionID: { type: Number, ref: 'Session'},
    ForumID: { type: Number, ref: 'Forum'},
    CreatedDate: Date,
    FilePath: String,
    UserID: { type: Number, ref: 'User'},
}, {
    collection: 'forums',
});

module.exports = mongoose.model('Forum', forumSchema);