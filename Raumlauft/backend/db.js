var mysql = require('mysql'),

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'raumluft_user',
  password: '123456!',
  database: 'raumluft',
});

exports.connect = function() {
  connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to ' + connection.config.database);
  });
};

exports.close = function() {
  connection.end(function(err) {
    if (err) throw err;
    console.log('Connection to ' + connection.config.database + ' closed');
  });
};

exports.getConnection = function() {
  return connection;
};

exports.isConnected = function() {
  if (connection.state != 'disconnected') {
    return true;
  }
  return false;
};

exports.fixtures = function(data) {
  var pool = state.pool;
  if (!pool) return done(new Error('Missing database connection.'));

  // var names = Object.keys(data.tables)
  // async.each(names, function(name, cb) {
  //   async.each(data.tables[name], function(row, cb) {
  //     var keys = Object.keys(row)
  //       , values = keys.map(function(key) { return "'" + row[key] + "'" })
  //
  //     pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb)
  //   }, cb)
  // }, done)
  console.log('Fixtures: ' + data);
};

exports.drop = function(tables, done) {
  var pool = state.pool;
  if (!pool) return done(new Error('Missing database connection.'));

  // async.each(
  //   tables,
  //   function(name, cb) {
  //     pool.query('DELETE * FROM ' + name, cb);
  //   },
  //   done
  // );

  console.log('Drop: ' + data);
};
