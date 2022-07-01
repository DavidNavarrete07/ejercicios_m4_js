// Etiquetas HTML
const btn_add = document.querySelector(".boton-agregar");
const btn_edit = document.querySelector(".boton-editar");
const btn_delete = document.querySelector(".boton-remover");
const input = document.querySelector(".input");
const item = document.querySelector(".item");


// Eventos de botón
btn_add.addEventListener('click', function () {
    if(input.value.length === 0){
        alert("Ingrese un valor");
    }else{
        const item = new Item(input.value.trim());
    }
});

btn_edit.addEventListener('click', function (e) {
    document.querySelector(".item-input").removeAttribute('disabled');
});

btn_delete.addEventListener('click', function () {
    console.log("Remover");
});

class Item {
    constructor(newTask) {
        this.crearDiv(newTask);
    }

    crearDiv(newTask) {
        console.log(newTask);
        let divItem = document.createElement("div");
        divItem.classList.add('input-group', 'mb-3');

        let inputItem = document.createElement("input");
        inputItem.setAttribute('type', 'text');
        inputItem.setAttribute('disabled', true);
        inputItem.classList.add('item-input', 'form-control', 'fst-italic');
        inputItem.value = newTask;

        item.appendChild(divItem).appendChild(inputItem);
        divItem.insertAdjacentHTML('beforeend', ` <button class="input-group-text boton-editar"><i class="bi bi-lock"></i></button>
        <button class="input-group-text boton-remover btn btn-danger">
            <i class="bi bi-trash3"></i>
        </button>`);
    }
}