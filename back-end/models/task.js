const { default: mongoose } = require("mongoose");


const taskScheme = new mongoose.Schema({
    _id: Number,
    TaskName: String,
    TaskDesc: String,
    TaskType: String,
    TaskDueDate: Date,

},{
    collections: 'tasks'
})

module.exports = mongoose.model('Task', taskScheme)