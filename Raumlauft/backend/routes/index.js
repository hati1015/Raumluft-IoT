var express = require('express');
var router = express.Router();

// var mysql = require('mysql');
// var SerialPort = require('serialport');
//
// var readLine = SerialPort.parsers.Readline;
// var serialPort = new SerialPort('/dev/ttyACM0', {
//   baudRate: 9600,
// });
// var parser = serialPort.pipe(new readLine({ delimiter: '\r\n' }));
//
// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'raumluft_user',
//   password: '123456!',
//   database: 'raumluft',
// });
// connection.connect(function(err) {
//   if (err) throw err;
//   console.log('Verbindung zur Datenbank aufgebaut');
// });
// serialPort.on('open', function() {
//   console.log('Verbindung zum Feather M0 aufgebaut');
// });
// parser.on('data', function(data) {
//   console.log('Datenset empfangen: \n' + data);
//   var sensor = 'sensorTEST';
//   var sql =
//     'INSERT INTO data (sensor, co2, tvoc, temp, pressure, altitude, humidity) VALUES (?, 652, 4333, 22.3, 53232.22, 80.4, 40)';
//   connection.query(sql, sensor, function(err, res) {
//     if (err) throw err;
//     console.log('\nDatenset in Datenbank hinzugefügt\n');
//     console.log(
//       '\n----------------------------------------------------------------------------\n'
//     );
//   });
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
