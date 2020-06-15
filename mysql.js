const mysql = require('mysql')

var pool =  mysql.createPool({
    "Hostname" : process.env.MYSQL_USER,
    "Port" : process.env.MYSQL_PORT,
    "Username" : process.env.MYSQL_USERNAME,
    "Password" : process.env.MYSQL_PASSWORD,


})

exports.pool = pool;