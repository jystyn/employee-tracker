const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    database: 'employee_db',
    user: 'root',
});

module.exports = connection;