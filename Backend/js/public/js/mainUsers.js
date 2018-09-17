$(document).ready(function() {

    var boton = $('#btnStaff');
    var botonplayer = $('#btnPlayer');
    var botonclub = $('#btnclub');
    var lista = $('#clubes');
    var lista2 = $('#equiposplayer');
    var td = $('#listadocrud');
    var registerForm = $('#formstaff');
    var loginButton = $('#loginButton');
    var loginForm = $('#loginForm');
    var formPlayer = $('#formPlayer');

    /*boton.on('click', function() {
        let data = registerForm.serialize();
        $.post('http://localhost:3000/persona/add', data, function(formulario) {
            alert(' ha sido registrado correctamente');

        });
    });

    botonplayer.on('click', function() {
        let data = formPlayer.serialize();
        $.post('http://localhost:3000/addPersona', data, function(formulario) {

        });
        alert(' ha sido registrado correctamente');
        formPlayer.clear();
    });*/

    botonclub.on('click', function() {
        let data = $('#formularioclub').serialize();
        $.post('http://localhost:8000/club/add', data, function(formulario) {

        });
    });

    $.get('http://localhost:8000/club/', function(club) {
        club.forEach(club => {
            lista.append('<option value="' + club.idClub + '" class="clubes" id="' + club.idClub + '">' + club.nombre);
            lista2.append('<option value="' + club.idClub + '" class="clubes" id="' + club.idClub + '">' + club.nombre);
        });
    });


    td.on('click', '.eliminarplayer', function() {
        let id = $(this).parent().parent().attr('id');
        $(this).parent().parent().remove();
        $.post('http://localhost:8000/persona/delete', { id: id }, function(jugador) {

        });
    });

    $('.equipo').on('click', function() {
        var club = $(this).attr('id')
        let clear = $('#listadocrud tr');
        clear.remove();
        $.get('http://localhost:8000/persona/clubes', { id: club }, function(jugador) {
            console.log(jugador);

            jugador.forEach(jugador => {
                td.append('<tr id="' + jugador.idPersona + '">' +
                    '<td value="' + jugador.idClub + '" class="jugadores" >' +
                    jugador.idPersona + '</td>' +
                    '<td>' + jugador.nombre + '</td>' +
                    '<td>' + jugador.apellidos + '</td>' +
                    '<td>' + jugador.email + '</td>' +
                    '<td>' + jugador.idClub + '</td>' +
                    '<td>' + jugador.pais + '</td>' +
                    '<td>' + jugador.rol + '</td>' +
                    '<td>' + jugador.altura + '</td>' +
                    '<td>' + jugador.posicion + '</td>' +
                    '<td>' + jugador.peso + '</td>' +
                    '<td>' + '<a class="mr-2" href= "vistaperfil?id=' + jugador.idPersona +
                    '"title = detalles data-toggle=tooltip>' +
                    '<i class="fas fa-eye">' + '</i>' + '</a>' +
                    '<a class="mr-2" href= modificar?id=' + jugador.idPersona +
                    ' title=Modificar data-toggle=tooltip>' +
                    '<i class="far fa-edit">' + '</i>' + '</a>' +
                    '<a href="#" class="eliminarplayer" title= Eliminar data-toggle=tooltip>' +
                    '<i class="far fa-trash-alt ">' + '</i>' + '</a>' + '</td>' + '</tr>');

            });
        });

    });
    $('#modificar').on('click', function() {
        let formModificado = $('#modificaplayer').serialize();
        console.log(formModificado);
        $.post('http://localhost:8000/jugador/modificar', formModificado, function(jugador) {});


    });

    loginButton.on('click', function() {
        let data = loginForm.serialize();
        $.post('http://localhost:8000/users/loginPersona', data, function(res) {
            console.log(res)
            alert('has sido logueado correctamente')
        });
    });


});