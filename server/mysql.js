const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'didi2003VlAd',
    database: 'energy'
});

con.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

module.exports = con;

