const config = require('../config/db.config');
var mysql      = require('mysql2');
var pool = mysql.createPool({
  host     : config.HOST,
  user     : config.USER,
  password : config.PASSWORD,
  database : config.DATABASE
});

module.exports = pool;