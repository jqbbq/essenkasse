"use strict";

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/*  Event listener for HTTP server "error" event. */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/* Event listener for HTTP server "listening" event. */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

/*  Normalize a port into a number, string, or false. */
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const mongoose = require('mongoose');


//var routes = require('./server/routes/index');
const users = require('./server/routes/users');
//const meals = require('./server/routes/meals');
//const deposits = require('./server/routes/deposits');

mongoose.connect('mongodb://localhost/essenkasse2', function (err) {
  if (err) {
    console.log('connection error', err);
  } else {
    console.log('connection successful');
  }
});

const app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'server/views'));
//app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/node_modules", express.static(path.join(__dirname, 'node_modules')));

//app.use('/', routes);
app.use('/api/users', users);
//app.use('/api/meals', meals);
//app.use('/api/deposits', deposits);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use(errorHandler());

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

const debug = require('debug')('essenkasse:server');
const http = require('http');

/*  Get port from environment and store in Express. */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/* Create HTTP server. */
const server = http.createServer(app);

/* Listen on provided port, on all network interfaces. */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

module.exports = app;
