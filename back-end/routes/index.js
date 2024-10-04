var express = require('express');
var router = express.Router();

// mongo
const mongoose = require('mongoose');
const connectDb = require('../config/connectDB');

mongoose.connect('mongodb://localhost:27017/lms', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
