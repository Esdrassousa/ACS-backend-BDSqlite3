const mysql = require('mysql2')

 const pool =  mysql.createPool({
    "user" : process.env.MYSQL_USER,
    "password" : process.env.MYSQL_PASSWORD,
    "database" : process.env.MYSQL_DATABASE,
    "host" : process.env.MYSQL_HOST,
    "port" : process.env.MYSQL_PORT,


})

exports.pool = pool; 

/* 
pool.connect(function(err){
  if(err) return console.log(err);
  console.log('conectou!');
}) */


/*  var connection =  mysql.createConnection({
    "host" : 'us-cdbr-iron-east-05.cleardb.net',
    "user" : 'b9d29dbf4876c1',
    "database" : 'heroku_6ac9ab071661142',
    "password" : 'c127899f',
    
})
console.log(CLEARDB_DATABASE_URL)
const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL) */
/* 
connection.connect(function(err){
    if(err) return console.log(err);
    console.log('conectou!');
  }) */


    
    //"port" : process.env.MYSQL_PORT