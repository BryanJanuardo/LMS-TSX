var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

var usersRouter = require('./routes/users');
var booksRouter = require('./routes/books');
var materialRouter = require('./routes/materials');
var courseRouter = require('./routes/courses');
var taskRouter = require('./routes/tasks');
var sessionlearningsRouter = require('./routes/sessionlearnings');
var courselearningsRouter = require('./routes/courselearnings');
var forumRouter = require('./routes/forum');
var sessionsRouter = require('./routes/sessions');

mongoose.connect('mongodb://localhost:27017/LMS', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/api/books', booksRouter);
app.use('/api/materials', materialRouter);
app.use('/api/courses', courseRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/courselearnings', courselearningsRouter);
app.use('/api/sessionlearnings', sessionlearningsRouter);
app.use('/api/forums', forumRouter);
app.use('/api/courselearning', sessionsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
