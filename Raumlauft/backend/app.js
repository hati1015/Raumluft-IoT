var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mysql = require('mysql');
var InsertQuery = require('mysql-insert-multiple');
var SerialPort = require('serialport');

var index = require('./routes/index');
var users = require('./routes/users');

/**

  Serielle Verbindung zum Port aufbauen
  Port: '/dev/ttyACM0'
  https://github.com/node-serialport/node-serialport/blob/4.0.1/README.md#opening-a-port
**/

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Database connection
app.use(function(req, res, next) {
  res.locals.connection = mysql.createConnection({
    host: 'localhost',
    user: 'raumluft_user',
    password: '123456!',
    database: 'raumluft',
  });
  res.locals.connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected');
    var portName = '/dev/ttyACM0';
    var Readline = SerialPort.parsers.Readline;
    var port = new SerialPort(portName);
    var parser = port.pipe(new Readline({ delimiter: '\r\n' }));

    port.on('open', function() {
      port.write('main screen turn on', function(err) {
        if (err) {
          return console.log(
            'Verbindung zum Feather M0 konnte nicht aufgebaut werden:\n ',
            err.message
          );
        }
        console.log('Verbindung zum Feather M0 aufgebaut');
        console.log('Daten werden gelesen...');

        parser.on('data', function(data) {
          myObj = JSON.parse(data);
          console.log(myObj);

          sensor = 'Sensor1';
          // Messdaten in Array speichern, damit diese einem Schub in die DB gespeichert werden können
          var post = [
            sensor,
            myObj.co2,
            myObj.tvoc,
            myObj.temp,
            myObj.pressure,
            myObj.altitude,
            myObj.humidity,
          ];
          // Werte in Datenbank speichern
          sql =
            'INSERT INTO data (sensor, co2, tvoc, temp, pressure, altitude, humidity) VALUES (?)';
          res.locals.connection.query(sql, [post], (err, res) => {
            if (err) throw err;
            console.log('inserted');
            console.log('Daten werden gelesen...');
          });
        });
      });
    });
  });
  next();
});

app.use('/', index);
app.use('/api/v1/data', users);

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
