var mysql  = require ('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    database: "logindb",
    user: process.env.MYSQL_USER_NAME,
    password: process.env.MYSQL_PASSWORD
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

export default connection;

