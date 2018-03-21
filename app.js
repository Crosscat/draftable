var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var draft = require('./routes/draftRoute');

var State = require('./state/state');
global.state = new State();

var app = express();

// Good idea, but not sure it's necessary, since everything should be in response to client actions
// var longpoll = require("express-longpoll")(app);
// longpoll.create("/poll");
// app.listen(8080, function () {
//   console.log("Listening on port 8080");
// });

// var val = 0;
// longpoll.publish("/poll", val);

// setInterval(function () {
//   longpoll.publish("/poll", val++);
// }, 5000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/draft', draft);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
