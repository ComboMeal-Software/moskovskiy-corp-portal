var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//configuration for server and DB
var config = require('./config');
var routes = require('./routes');
const bcrypt = require('bcrypt-nodejs');
const fileUpload = require('express-fileupload');
const models = require('./models');

//Mongo
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);



var dataBaseConnect = require('./databaseConnect');
// Connect to database

dataBaseConnect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// other settings
app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);


app.all(['/login','/'], routes.indexRouter);
app.all('/Admin_emp_new',routes.Admin_emp_new);


app.all('/exit', function(req, res) {
  // Удалить сессию
  if (req.session) {
    req.session.destroy(()=>console.log('You exited!'));
  }
  res.redirect('/login');
});
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

//Starting the Server

app.listen(config.PORT, () =>
console.log(`LilDevs app listening on port ${config.PORT}!`)
);
let CreateAdmin = ()=>{
  bcrypt.hash('AdminAdmin', null, null, (err, hash) =>{
  models.User.create({
    login:'MoskovskyAdmin',
    name:'Александр',
    lastName:'Козак',
    patronymic:'Петрович',
    password: hash,
    admin:true,
  });
  });
};
let CreateDepartments = ()=>{
  bcrypt.hash('AdminAdmin', null, null, (err, hash) =>{
  models.Departments.create([
    {
    id:1,
    name:"First Department",
    },
    {
      id:2,
      name:"Second Department",
    },
    {
      id:3,
      name:"Fourth Department",
    },
    {
      id:4,
      name:"Fifth Department",
    },
]);
  });
};
//CreateDepartments();
//CreateAdmin();
module.exports = app;
