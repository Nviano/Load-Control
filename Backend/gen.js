

const nombres = ["unicaja", "peioias", "sadasd"]
const paises = ["españa", "china"]
const ciudad = ["malaga", "granada"]

for (let i = 0; i < 50; i++) {
    console.log(`Insert into club (nombre,pais,ciudad) VALUES ("${rand(nombres)}","${rand(paises)}","${rand(ciudad)}");`)
}

function rand(array) {
    return array[Math.floor(Math.random() * array.length) + 0];
}