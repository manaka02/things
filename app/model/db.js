'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : '192.168.1.3',
    user     : 'DESKTOP-FGMHHEE',
    password : 'root',
    database : 'hackathon'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;