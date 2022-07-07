const inputSearch = document.querySelector('#inputSearch');
const btnSearch = document.querySelector("#btnSearch");
let imgSuperhero = document.querySelector("#imgSuperhero");
let nameSuperhero = document.querySelector("#nameSuperhero");
let connectionsSuperhero = document.querySelector("#connectionsSuperhero");
let publisherSuperhero = document.querySelector("#publisherSuperhero");
let worksSuperhero = document.querySelector("#worksSuperhero");
let firstApearanceSuperhero = document.querySelector("#firstApearanceSuperhero");
let heightSuperhero = document.querySelector("#heightSuperhero");
let weightSuperhero = document.querySelector("#weightSuperhero");
let aliasesSuperhero = document.querySelector("#aliasesSuperhero");


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
    const url = `https://superheroapi.com/api.php/${keyAPI}/${superheroID}`;
    console.log(url);
    try{
        let superhero = await fetch(url);
        superhero = await superhero.json();
        imgSuperhero.src = superhero.image.url;
        nameSuperhero.textContent = 'Nombre: ' + superhero.name;
        connectionsSuperhero.textContent = 'Conexiones: ' + superhero.connections['group-affiliation'];
        publisherSuperhero.textContent = 'Publicado por: ' + superhero.biography.publisher;
        worksSuperhero.textContent = 'Ocupaciones: ' + superhero.work.occupation;
        firstApearanceSuperhero.textContent = 'Primera aparición: ' + superhero.biography['first-appearance'];
        heightSuperhero.textContent = 'Altura: ' + superhero.appearance.height;
        weightSuperhero.textContent = 'Peso: ' + superhero.appearance.weight;
        aliasesSuperhero.textContent = 'Aliados: ' + superhero.biography.aliases;
        var options = {
            title: {
                text: 'Estadísticas de poder para ' + superhero.name
            },
            subtitles: [{
                text: "As of November, 2017"
            }],
            animationEnabled: true,
            data: [{
                type: "pie",
                startAngle: 40,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} ({y})",
                dataPoints: [
                    { y: superhero.powerstats.intelligence, label: "Inteligencia" },
                    { y: superhero.powerstats.strength, label: "Fuerza" },
                    { y: superhero.powerstats.speed, label: "Velocidad" },
                    { y: superhero.powerstats.durability, label: "Durabilidad" },
                    { y: superhero.powerstats.power, label: "Poder" },
                    { y: superhero.powerstats.combat, label: "Combate" }
                ]
            }]
        };
        $("#chartContainer").CanvasJSChart(options);
        console.log(superhero);
    }catch(error){
        console.log("Hubo un error: " + error);
    }
}