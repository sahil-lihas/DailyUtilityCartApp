var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var env = process.env.NODE_ENV || 'development';
var config = require('./config/config.json')[env];
var mongoose = require('mongoose');
/**
 * Change the route name. Notice that routes/index is changed to routes/items
 */
var itemsRoute = require('./routes/items');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(config.mongoURI, { //options here
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(function() {
  console.log(`--Mongoose Connected---`)
}).catch(err => {
  console.log(err);
})

/**
 * Now use the items route to declare routes..
 */
app.use('/api/item', itemsRoute);

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
