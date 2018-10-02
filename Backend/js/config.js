var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "load_control"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Conectado! Dale ahi compadre!");

});

module.exports = con;