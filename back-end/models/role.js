const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    _id: Number,
    RoleName: String,
}, {
    collection: 'roles',
});

module.exports = mongoose.model('Role', roleSchema);