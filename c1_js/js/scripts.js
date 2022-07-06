
// Etiquetas HTML
const btn_add = document.querySelector(".boton-agregar");
const input = document.querySelector(".input");
const container = document.querySelector(".container");
// Clase Item
class Item {
    constructor(newTask) {
        this.createDiv(newTask);
    }

    createDiv(newTask) {
        // creando el div contenedor
        const divItem = document.createElement("div");
        divItem.classList.add('input-group', 'item', 'mb-3');
        // creando el input
        const inputItem = document.createElement("input");
        inputItem.setAttribute('type', 'text');
        inputItem.setAttribute('disabled', true);
        inputItem.classList.add('item-input', 'form-control', 'fst-italic');
        inputItem.value = newTask;
        divItem.appendChild(inputItem);
        // creando los botones
        const btn_edit = document.createElement("button");
        btn_edit.classList.add('btn', 'btn-outline-success', 'boton-editar');
        btn_edit.innerHTML = `<i class="bi bi-lock"></i>`;
        // agrego el evento y la función a ejecutar cuando se haga click en el botón
        btn_edit.addEventListener('click', function () {changeStateBtnEdit(inputItem, btn_edit)}, false);
        divItem.appendChild(btn_edit);
        const btn_delete = document.createElement("button");
        btn_delete.classList.add('btn', 'btn-danger', 'boton-remover');
        btn_delete.innerHTML = `<i class="bi bi-trash3"></i>`;
        // agrego el evento y la función para el boton eliminar
        btn_delete.addEventListener('click', function () {deleteTask(divItem)}, false);
        divItem.appendChild(btn_delete);
        // Agrego todo
        container.appendChild(divItem);
    }
}

// Eventos de botón
btn_add.addEventListener('click', function () {
    checkInput(input);
});

/**
 * Función para modificar el estado del botón editar dependiendo si está habilitado o no
 * @param {*} inputItem input:text a modificar
 * @param {*} btn_edit el boton para cambiarle los iconos
 */
function changeStateBtnEdit(inputItem, btn_edit) {
    if (inputItem.disabled) {
        inputItem.disabled = false;
        btn_edit.innerHTML = `<i class="bi bi-unlock"></i>`;
    } else {
        inputItem.disabled = true;
        btn_edit.innerHTML = `<i class="bi bi-lock"></i>`;
    }
}

/**
 * Función para chequear si el input está vacío o no
 * @param {*} task input:text de la tarea a agregar
 */
function checkInput(task) {
    if (task.value.length === 0) {
        alert("Ingrese un valor");
    } else {
        const item = new Item(task.value.trim());
        task.value = "";
    }
}

/**
 * Función para eliminar una tarea específica de la lista
 * @param {*} divItem contenedor principal donde está agregado el input
 */
function deleteTask(divItem) {
    if (divItem.classList.contains('item')) {
        divItem.remove();
    }
}