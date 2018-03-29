var mysql  = require ('mysql');
require('dotenv').config()

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  database: process.env.DB_SCHEMA,
  user: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD
});
  
connection.connect(function(err) {
  if (err) console.log(err);
  else console.log("Connected!");
});

export default connection;

