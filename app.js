var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./models'); // db 모듈 불러오기
var bodyParser  = require('body-parser'); //데이터 처리 미들웨어

var PAGEAPI = require('./routes/page');
var STROEAPI = require('./routes/store');
var USERAPI = require('./routes/user');
var app = express();

//db 연결
db();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', PAGEAPI); 
app.use('/API_STORE', STROEAPI);
app.use('/API_USER', USERAPI);

app.use('/signin', PAGEAPI);
app.use('/signup', PAGEAPI);
// app.use('/sign_up', PAGEAPI);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

