const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    _id: Number,
    MaterialName: String,
    MaterialType: String,
    MaterialPath: String,
}, {
    collection: 'materials',
});

module.exports = mongoose.model('Materials', materialSchema)