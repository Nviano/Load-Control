DROP TABLE if exists club;
CREATE TABLE club(
idClub INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nombre varchar(50) NOT NULL,
pais varchar(70) NOT NULL,
ciudad varchar(70) NOT NULL);

DROP TABLE if exists persona;
CREATE TABLE persona (
idPersona INT(11) NOT NULL AUTO_INCREMENT,
idClub INT(11) NOT NULL,
nombre VARCHAR(50) NOT NULL,
apellidos VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL,
password VARCHAR(70) NOT NULL,
pais VARCHAR(70) NOT NULL,
fechaNacimiento DATE NOT NULL,
telefono VARCHAR(20) NOT NULL,
rol SMALLINT(6) NOT NULL,
avatar MEDIUMBLOB NOT NULL,
PRIMARY KEY (idPersona),
UNIQUE INDEX idPersona_UNIQUE (idPersona ASC),
UNIQUE INDEX email_UNIQUE (email ASC),
INDEX FK_usuario_club (idClub ASC),
CONSTRAINT FK_usuario_club
FOREIGN KEY (idClub)
REFERENCES club (idClub));

DROP TABLE if exists jugador;
CREATE TABLE jugador(
idPersona INT  NOT NULL,
altura varchar(5) NOT NULL,
peso varchar(5) NOT NULL,
posicion varchar(20) NOT NULL,
CONSTRAINT FK_jugador_persona FOREIGN KEY(idPersona) REFERENCES persona(idPersona));

DROP TABLE if exists training;
CREATE TABLE training(
idTraining INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
idClub INT NOT NULL,
fecha date NULL,
sesion varchar(5)  NULL,
duracion varchar(5)  NULL,
CONSTRAINT FK_club FOREIGN KEY(idClub) REFERENCES club(idClub));

DROP TABLE if exists trainingReport;
CREATE TABLE trainingReport(
idTrainingReport INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
idTraining INT NOT NULL,
idPersona INT  NOT NULL,
RPE varchar(10)  NULL,
sleep varchar(5) NULL,
info varchar(150) NULL,
CONSTRAINT FK_training_persona FOREIGN KEY(idPersona) REFERENCES persona(idPersona) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT FK_training FOREIGN KEY(idTraining) REFERENCES training(idTraining));



Insert into club (nombre,pais,ciudad) VALUES ("Unicaja","España","Malaga");
Insert into club (nombre,pais,ciudad) VALUES ("Chicago Bulls","Estados Unidos","Chicago");
Insert into club (nombre,pais,ciudad) VALUES ("Soles","Mexico","Mexicali");
Insert into persona (idClub,nombre,apellidos,email,password,pais,fechaNacimiento,telefono,altura,peso) VALUES (2,"Nacho","Viano","nv@nv.com",1234,"españa",2000/11/11,666554433,179,89);
Insert into posicion (posicion) VALUE ("Base");



