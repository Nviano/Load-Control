var express = require('express');
var bodyParser = require('body-parser');
var port = 8000;
var app = express();
var session = require('express-session');
var logger = require('morgan');
var cookieParser = require('cookie-parser');


//Configuracion de archivos

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use(cookieParser());
app.use(logger('dev'));

//Creacion del servidor
app.listen(port, () => {
    console.log('Esto va como un tiro');
});



//Configuracion de sesiones
app.use(session({
    secret: 'cadena aleatoria',
    resave: true,
    saveUninitialized: true,
    // cookie: {
    //     expiress: new Date(Date.now() + 60000),
    //     httpOnly: true
    //   }
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://nviano.es");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    next();
});

app.get('/', function (req, res, next) {
    // Handle the get for this route
});

app.post('/', function (req, res, next) {
    // Handle the post for this route
});


//Exporta este archivo al index
module.exports = app;