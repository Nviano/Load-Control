var con = require('../config');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
const COOKIE_SECRET = '9847048yrf08fh08wyf348';
require('dotenv').config();

var login = {
    loginPersona: function (req, res) {
        const { email, password } = req.body;
        console.log(email);
        let sql = `SELECT * from persona where email ='${email}'  `;
        con.query(sql, function (err, result) {
            if (err) {
                return res.send(err);
            } else {
                if (result == "") {
                    return res.status(401).send({ error: 'Algunos de tus datos no son correctos' });
                } else {
                    bcrypt.compare(password, result[0].password, function (err, iguales) {
                        if (err) {
                            return res.send(err)
                        } else {
                            if (iguales) {
                                jwt.sign({ id: result[0].idPersona, email, rol: result[0].rol, idClub: result[0].idClub, nombre: result[0].nombre }, process.env.COOKIE_SECRET,
                                    { expiresIn: '2h' }, (error, TOKEN) => {
                                        if (error) return res.status(500).json({ error: 'ERROR SIGNING THE TOKEN' });
                                        res.cookie('access_token', TOKEN, {
                                            maxAge: new Date(Date.now() + 1000000),
                                            httpOnly: false,
                                        });


                                        return res.status(200).send({
                                            message: 'User logged with success',
                                            idClub: result[0].idClub,
                                            nombre: result[0].nombre,
                                            rol: result[0].rol
                                        });
                                    });
                            } else {
                                return res.status(401).send({ error: 'Algunos de tus datos no son correctos' })
                            };
                        };
                    });
                };
            };
        });
    },
    status: function (req, res) {
        return res.status(200).send({ message: 'ok', idClub: req.user.idClub, rol: req.user.rol, nombre: req.user.nombre });
    },
    logout: function (req, res) {
        res.clearCookie("access_token");
        return res.status(200).send({ message: 'ok', rol: req.user.rol });
    }
};


module.exports = login;