const mongoose = require('mongoose');

async function connectDB(){
    console.log("test")
    await mongoose.connect('mongodb://localhost:27017/lms')
}


module.exports = connectDB;