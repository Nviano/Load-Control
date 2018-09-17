var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "viano1984",
    database: "load_control"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Conectado! Dale ahi compadre!");

});

module.exports = con;