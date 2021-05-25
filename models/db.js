const config = require('../config/db.config');
var mysql      = require('mysql2');
var connection = mysql.createConnection({
  host     : config.HOST,
  user     : config.USER,
  password : config.PASSWORD,
  database : config.DATABASE
});

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;