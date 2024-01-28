const mysql = require('mysql');
const connection =  mysql.createConnection({
 host:'localhost',
 user:'root',
 password:'',
 database:'mobile_store'
});
module.exports=connection;
 