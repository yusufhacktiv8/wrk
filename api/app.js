var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var fileUpload = require('express-fileupload');

var users = require('./routes/users');
var changePassword = require('./routes/change_password');
var changeMyPassword = require('./routes/change_my_password');
var roles = require('./routes/roles');
var security = require('./routes/security');
var revenues = require('./routes/revenues');
var omzets = require('./routes/omzets');
var sales = require('./routes/sales');
var credits = require('./routes/credits');
var creditsByYear = require('./routes/credits_by_year');

var projectUsers = require('./routes/project_users');
var projects = require('./routes/projects');
var usersByRole = require('./routes/users_by_role');

var netProfit = require('./routes/net_profit');
var projectProgresses = require('./routes/project_progresses');
var smwgTemplates = require('./routes/smwg_templates');
var smwgs = require('./routes/smwgs');
var smwgItems = require('./routes/smwg_items');
var uploads = require('./routes/uploads');
var uploadFile = require('./routes/upload_file');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

// app.use('/', index);
app.use('/api/users', users);
app.use('/api/changepassword', changePassword);
app.use('/api/changemypassword', changeMyPassword);
app.use('/api/roles', roles);
app.use('/api/security', security);
app.use('/api/revenues', revenues);
app.use('/api/omzets', omzets);
app.use('/api/sales', sales);
app.use('/api/credits', credits);
app.use('/api/creditsbyyear', creditsByYear);
app.use('/api/projectusers', projectUsers);
app.use('/api/projects', projects);
app.use('/api/usersbyrole', usersByRole);
app.use('/api/netprofit', netProfit);
app.use('/api/projectprogresses', projectProgresses);
app.use('/api/smwgtemplates', smwgTemplates);
app.use('/api/smwgs', smwgs);
app.use('/api/smwgitems', smwgItems);
app.use('/api/uploads', uploads);
app.use('/api/uploadfile', uploadFile);

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
