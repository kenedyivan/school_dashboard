var mysql = require('mysql')
var connection = mysql.createPool({
    host        : 'localhost',
    user        : 'root',
    password    : '123!@#QWEasd', // Change database password to your owner database credentials
    database    : 'school_db'
});

module.exports = connection;