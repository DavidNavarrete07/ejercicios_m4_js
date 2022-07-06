const inputSearch = document.querySelector('#inputSearch');
const btnSearch = document.querySelector("#btnSearch");

// Eventos
btnSearch.addEventListener('click', function () {
    checkInput();
    getDataSuperHero(inputSearch.value.trim());
});

inputSearch.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        checkInput();
    }
});

/**
 * Función para validar que el usuario ingrese datos y solo sean números
 */
function checkInput() {
    if (inputSearch.value.length === 0) {
        alert("Ingrese un valor a buscar");
    } else if (!/^[0-9]+$/.test(inputSearch.value.trim())) {
        alert("Solo puede ingresar números");
        inputSearch.value = "";
    }
}

async function getDataSuperHero(superheroID) {
    const url = `https://superheroapi.com/api/${keyAPI}/${superheroID}`;
    console.log(url);
    try{
        let superhero = await fetch(url);
        superhero = await superhero.json();
        console.log(superhero);
    }catch(error){
        console.log("Hubo un error: " + error);
    }
}