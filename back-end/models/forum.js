const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema({
    _id: Number,
    ForumTitle: String,
    ForumDescription: String,
    CreatedDate: Date,
    FilePath: String,
    SessionLearningID: { type: Number, ref: 'SessionLearning'},
    ForumID: { type: Number, ref: 'Forum'},
    ForumRepliesID: [{ type: Number, ref: 'Forum'}],
    UserID: { type: Number, ref: 'User'},
}, {
    collection: 'forums',
});

module.exports = mongoose.model('Forum', forumSchema);