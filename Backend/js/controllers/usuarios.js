var con = require('../config');
var bcrypt = require('bcrypt-nodejs');


//Inserta tanto jugadores como staff en sus tablas de BBDD
var controller = {
    addPersona: function (req, res) {

        let rol = 1;
        let password = req.body.password;
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, null, function (err, hash) {
                password = hash;
                if (req.body.altura && req.body.peso && req.body.posicion) {
                    rol = 2;
                }
                let sql = `INSERT INTO persona (nombre,apellidos,telefono,email,password,
            rol,fechaNacimiento,pais,idClub,avatar) 
        VALUES ('${req.body.nombre}','${req.body.apellidos}',
        '${req.body.telefono}','${req.body.email}','${password}','${rol}',
        '${req.body.fechaNacimiento}','${req.body.pais}','${req.body.club}','${req.body.avatar}')`;

                con.query(sql, function (err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).send(err);
                    } else {
                        if (rol == 2) {
                            let sql2 = `INSERT INTO jugador (idPersona,altura,peso,posicion) 
                        VALUES ('${result.insertId}','${req.body.altura}','${req.body.peso}','${req.body.posicion}')`;
                            con.query(sql2, function (err, result2) {
                                if (err) {
                                    console.log(err);
                                    res.status(500).send(err);
                                }
                            })
                        }
                        let user = {
                            id: result.insertId,
                            nombre: req.body.nombre
                        }
                        return res.status(200).send({
                            ok: true
                        });

                    }
                });
            });
        })
    },

    //Añade entrenamientos de Staff 
    addTrainingStaff: function (req, res) {
        let sql = `INSERT INTO training (fecha,sesion,duracion,idClub) 
        VALUES ('${req.body.fecha}','${req.body.sesion}','${req.body.duracion}','${req.user.idClub}')`;
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).send({ error: err.message });
            } else {
                return res.status(200).send({
                    ok: true
                });
            }
        });

    },
    //Añade entrenamientos de Players 
    addTrainingPlayer: function (req, res) {
        const { idTraining, RPE, sleep, info } = req.body;
        let sql = `INSERT INTO trainingReport (idTraining,RPE,sleep,info,idPersona) 
        VALUES ('${idTraining}','${RPE}','${sleep}','${info}','${req.user.id}')`;
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                return res.status(200).send({
                    ok: true
                });
            }
        });

    },

    //Recoge los clubes de base de datos para mostrarlos en los registros
    getClub: function (req, res) {
        let sql = 'SELECT * from club';
        con.query(sql, function (err, result) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(result);
            }
        });
    },

    //Trae los campos requeridos de base de datos para mostrarlos en el crud
    getPlayers: function (req, res) {
        let sql = `SELECT P.idPersona,P.nombre,P.apellidos,P.email,P.idClub,P.pais,P.rol
        ,J.altura, J.posicion,J.peso FROM persona 
        AS P INNER JOIN jugador AS J ON P.idPersona= J.idPersona`;
        con.query(sql, function (err, result) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send({ result, ok: true });
            }
        });
    },

    //Trae los jugadores registrados en cada club en el crud
    getClubes: function (req, res) {
        let sql = `SELECT P.idPersona,P.nombre,P.apellidos,P.email,P.idClub,P.pais,P.rol
        ,J.altura, J.posicion,J.peso FROM persona 
        AS P INNER JOIN jugador AS J ON P.idPersona= J.idPersona 
        where idClub = '${req.query.id}'`;
        con.query(sql, function (err, result) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send({ result, ok: true });
            }
        });
    },


    //Borra los jugadores desde el crud
    deletePlayer: function (req, res) {
        console.log(req.body.idPersona)
        let sql = `DELETE FROM jugador where idPersona = '${req.body.idPersona}'`;
        console.log(req.body);
        con.query(sql, function (err, result) {

            if (err) {
                console.log(err);
                res.send(err);
            } else {
                let sql2 = `DELETE FROM persona where idPersona = '${req.body.idPersona}'`;
                con.query(sql2, function (err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).send(err);
                    } else {
                        res.status(200).send({ result, ok: true });
                        console.log(result);
                    }
                })
            }
        });
    },

    //Manda los datos modificados del jugador a BBDD
    updatePlayer: function (req, res) {
        console.log(req.body)
        let sql = `UPDATE persona set nombre ='${req.body.nombre}', 
        apellidos= '${req.body.apellidos}',
        telefono= '${req.body.telefono}' ,
        email= '${req.body.email}' 
        where idPersona = '${req.body.idPersona}'`;
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                let sql2 = `UPDATE jugador set altura= '${req.body.altura}', 
                peso= '${req.body.peso}' where idPersona = '${req.body.idPersona}'`
                con.query(sql2, function (err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).send(err);
                    } else {
                        res.status(200).send({ result, ok: true });
                        console.log(result);
                    }
                })
            }
        });
    },

    //LLeva los datos del jugador a la pag de modificar el perfil del jugador
    getUpdatePlayer: function (req, res) {
        let sql = `SELECT P.idPersona,P.nombre,P.apellidos,P.email,P.password,
        P.telefono, J.posicion,J.peso FROM persona 
        AS P INNER JOIN jugador AS J ON P.idPersona= J.idPersona
        where P.idPersona = '${req.query.id}'`;

        con.query(sql, function (err, result) {

            if (err) {
                res.status(500).send(err);
            } else {
                console.log(result);
                // res.status(200).render('modificar', {
                //     resultado: result,
                // });
                res.status(200).send({ result, ok: true });
            }
        });
    },

    //Trae los datos del perfil de un jugador para mostrarlos en la vista del crud
    getPlayer: function (req, res) {
        console.log(req.user)
        let sql = `SELECT P.idPersona,P.avatar,P.nombre,P.apellidos,P.email,P.idClub,P.pais,P.rol
        ,P.fechaNacimiento,P.telefono,J.altura, J.posicion,J.peso FROM persona 
        AS P INNER JOIN jugador AS J ON P.idPersona= J.idPersona 
        where P.idPersona = '${req.user.id}'`;

        con.query(sql, function (err, result) {
            if (err) {
                res.status(500).send(err);
            } else {
                const player = result[0]
                var bufferBase64 = player.avatar.toString('utf-8');
                player.avatar = bufferBase64;
                res.status(200).send({ result: player, ok: true });
            }

        });

    },

    //Trae los datos de los staff
    getStaff: function (req, res) {
        console.log(req.user)
        let sql = `SELECT P.idPersona,P.nombre,P.apellidos,P.email,P.idClub,P.pais,P.rol
        ,P.fechaNacimiento,P.telefono FROM persona 
        AS P where P.idPersona = '${req.user.id}'`;

        con.query(sql, function (err, result) {

            if (err) {
                res.status(500).send(err);
            } else {

                res.status(200).send({ result, ok: true });
            }
        });

    },

    //Trae los jugadores de cada club

    getPlayerClub: function (req, res) {
        let sql = `SELECT P.idPersona,P.nombre,P.apellidos,P.email,P.idClub,P.pais ,J.altura, J.posicion,J.peso 
        FROM persona as P INNER JOIN jugador AS J ON P.idPersona=J.idPersona where 
        idClub = '${req.user.idClub}' && rol = 2`;
        con.query(sql, function (err, result) {
            if (err) {
                res.status(500).send(err);
            } else {

                res.status(200).send({ result, ok: true });
            }
        });
    },

    //Recoge los entrenos hechos por el admin para mostrarlos en los reportes de los jugadores

    getTrainings: function (req, res) {
        let sql = `SELECT idTraining, fecha,sesion,duracion FROM training 
        WHERE idClub='${req.user.idClub}' AND idTraining NOT IN (SELECT idTraining FROM trainingReport WHERE idPersona = '${req.user.id}')`
        con.query(sql, function (err, result) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send({ result, ok: true });

            }
        })
    },

    //Trae los reportes de los jugadores para la tabla del admin

    getReportPlayer: function (req, res) {
        let sql = `SELECT RPE, sleep,info, idPersona,fecha,duracion from trainingReport 
        JOIN training ON trainingReport.idTraining = training.idTraining WHERE idPersona='${req.body.idPersona}'`
        con.query(sql, function (err, result) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send({ result, ok: true });

            }
        })
    }

}


module.exports = controller;