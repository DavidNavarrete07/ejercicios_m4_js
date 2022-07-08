// Etiquetas HTML
const inputSearch = document.querySelector('#inputSearch');
const btnSearch = document.querySelector("#btnSearch");
const containerCard = document.querySelector("#containerCard");
let contClick = 0;

// Eventos
btnSearch.addEventListener('click', function () {
    checkInput();
    contClick++;
    if (contClick == 1) {
        const superhero = new Superhero();
        superhero.getDataSuperHero(inputSearch.value.trim());
    } else {
        document.querySelector("#cardSuperhero").remove();
        const superhero = new Superhero();
        superhero.getDataSuperHero(inputSearch.value.trim());
    }
});

inputSearch.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        checkInput();
        contClick++;
        if (contClick == 1) {
            const superhero = new Superhero();
            superhero.getDataSuperHero(inputSearch.value.trim());
        } else {
            document.querySelector("#cardSuperhero").remove();
            const superhero = new Superhero();
            superhero.getDataSuperHero(inputSearch.value.trim());
        }
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

class Superhero {
    constructor() {
        this.image = document.querySelector("#imgSuperhero");
        this.name = document.querySelector("#nameSuperhero");
        this.connections = document.querySelector("#connectionsSuperhero");
        this.publisher = document.querySelector("#publisherSuperhero");
        this.works = document.querySelector("#worksSuperhero");
        this.firstApearance = document.querySelector("#firstApearanceSuperhero");
        this.height = document.querySelector("#heightSuperhero");
        this.weight = document.querySelector("#weightSuperhero");
        this.aliases = document.querySelector("#aliasesSuperhero");
        this.intelligence = '';
        this.strength = '';
        this.speed = '';
        this.durability = '';
        this.power = '';
        this.combat = '';
    }
    /**
     * Método para traer los datos de la API SuperHero a través del ID
     * Se necesita del token (keyAPI) para hacer la petición
     * @param {*} superheroID ID del superhéroe
     */
    async getDataSuperHero(superheroID) {
        const url = `https://superheroapi.com/api.php/${keyAPI}/${superheroID}`;
        try {
            let superhero = await fetch(url);
            superhero = await superhero.json();
            this.image = superhero.image.url;
            this.name = superhero.name;
            this.connections = superhero.connections['group-affiliation'];
            this.publisher = superhero.biography.publisher;
            this.works = superhero.work.occupation;
            this.firstApearance = superhero.biography['first-appearance'];
            this.height = superhero.appearance.height;
            this.weight = superhero.appearance.weight;
            this.aliases = superhero.biography.aliases;
            this.intelligence = superhero.powerstats.intelligence;
            this.strength = superhero.powerstats.strength;
            this.speed = superhero.powerstats.speed;
            this.durability = superhero.powerstats.durability;
            this.power = superhero.powerstats.power;
            this.combat = superhero.powerstats.combat;
            this.createCardInfo();
            this.generateGraphPowerstatsSuperhero();
        } catch (error) {
            console.log("Hubo un error: " + error);
        }
    }
    /**
     * Método para crear una card con la info del superhéroe
     */
    createCardInfo() {
        const card = document.createElement("div");
        card.classList.add('card', 'shadow-lg', 'd-block', 'mb-3');
        card.setAttribute('id', 'cardSuperhero');
        card.innerHTML =
            `<div class="row g-0">
            <div class="col-md-4">
                <img id="imgSuperhero"
                    src="${this.image}"
                    class="img-fluid rounded-start" alt="Imagen de superhéroe">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title fw-bold text-uppercase" id="nameSuperhero">${this.name}</h5>
                    <p class="card-text" id="connectionsSuperhero"><b>Conexiones: </b>${this.connections}</p>
                    <div class="accordion accordion-flush" id="accordionFlushExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingOne">
                                <button class="accordion-button collapsed border border-secondary fw-bold"
                                    type="button" data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseOne" aria-expanded="false"
                                    aria-controls="flush-collapseOne">
                                    Más detalles
                                </button>
                            </h2>
                            <div id="flush-collapseOne" class="accordion-collapse collapse"
                                aria-labelledby="flush-headingOne"
                                data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                    <ul class="list-group">
                                        <li class="list-group-item" id="publisherSuperhero"><b>Publicado por: </b>${this.publisher}</li>
                                        <li class="list-group-item" id="worksSuperhero"><b>Ocupaciones: </b>${this.works}</li>
                                        <li class="list-group-item" id="firstApearanceSuperhero"><b>Primera aparición: </b>${this.firstApearance}</li>
                                        <li class="list-group-item" id="heightSuperhero"><b>Altura: </b>${this.height}</li>
                                        <li class="list-group-item" id="weightSuperhero"><b>Peso: </b>${this.weight}</li>
                                        <li class="list-group-item" id="aliasesSuperhero"><b>Aliados: </b>${this.aliases}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        containerCard.appendChild(card);
    }
    /**
     * Método para generar el gráfico de torta en base a las powerstats del superhéroe
     */
    generateGraphPowerstatsSuperhero() {
        let options = {
            title: {
                text: 'Estadísticas de poder para ' + this.name
            },
            animationEnabled: true,
            data: [{
                type: "pie",
                startAngle: 40,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 12,
                indexLabel: "{label} ({y})",
                dataPoints: [
                    { y: this.intelligence, label: "Inteligencia" },
                    { y: this.strength, label: "Fuerza" },
                    { y: this.speed, label: "Velocidad" },
                    { y: this.durability, label: "Durabilidad" },
                    { y: this.power, label: "Poder" },
                    { y: this.combat, label: "Combate" }
                ]
            }]
        };
        $("#chartContainer").CanvasJSChart(options);
    }
}