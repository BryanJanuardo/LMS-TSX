const mongoose = require('mongoose');

const sessionLearningSchema = new mongoose.Schema({
    _id: Number,
    SessionID: { type: Number, ref: 'Session'},
    MaterialID: [{ type: Number, ref: 'Material' }],
    TaskID: [{ type: Number, ref: 'Task' }],
}, {
    collection: 'sessionlearnings',
});

module.exports = mongoose.model('SessionLearning', sessionLearningSchema);