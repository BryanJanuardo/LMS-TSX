const mongoose = require('mongoose');

const sessionLearningSchema = new mongoose.Schema({
    _id: Number,
    SessionID: mongoose.Schema.Types.ObjectId, ref: 'Session',
    MaterialID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Material' }],
    TaskID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
}, {
    collection: 'sessionlearnings',
});

module.exports = mongoose.model('SessionLearning', sessionLearningSchema);