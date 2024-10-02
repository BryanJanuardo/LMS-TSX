//express
var express = require('express');
var app = express();
var router = express.Router();

// mongo
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/lms', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// cors
const cors = require('cors');
app.use(cors());

module.exports = router;
