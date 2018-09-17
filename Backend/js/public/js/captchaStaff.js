//Añadir un staff

document.getElementById('formstaff').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

    const nombre = document.querySelector('#nombre').value;
    const apellidos = document.querySelector('#apellidos').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const pais = document.querySelector('#pais').value;
    const club = document.querySelector('#clubes').value;
    const fechaNacimiento = document.querySelector('#fechaNacimiento').value;
    const telefono = document.querySelector('#telefono').value;
    const captcha = document.querySelector('#g-recaptcha-response').value;

    fetch('/addPersona', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                apellidos: apellidos,
                email: email,
                password: password,
                pais: pais,
                club: club,
                fechaNacimiento: fechaNacimiento,
                telefono: telefono,
                captcha: captcha
            })
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);

        })


}