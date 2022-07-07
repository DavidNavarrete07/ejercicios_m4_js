
// Etiquetas HTML
const btn_add = document.querySelector(".boton-agregar");
const input = document.querySelector(".input");
const container = document.querySelector(".container");
let arrTasks = [];
// Clase Item
class Item {
    constructor(newTask) {
        this.createDiv(newTask);
    }

    createDiv(newTask) {
        // creando el div contenedor
        const divItem = document.createElement("div");
        divItem.classList.add('input-group', 'item', 'mb-3');
        divItem.setAttribute('data-aos', 'flip-up');
        // creando el input
        const inputItem = document.createElement("input");
        inputItem.setAttribute('type', 'text');
        inputItem.setAttribute('disabled', true);
        inputItem.classList.add('item-input', 'form-control', 'fst-italic');
        inputItem.setAttribute('onfocus', 'this.oldvalue = this.value');
        inputItem.value = newTask;
        divItem.appendChild(inputItem);
        // creando los botones
        const btn_edit = document.createElement("button");
        btn_edit.classList.add('btn', 'btn-outline-secondary', 'boton-editar');
        btn_edit.innerHTML = `<i class="bi bi-lock"></i>`;
        // agrego el evento y la función a ejecutar cuando se haga click en el botón
        btn_edit.addEventListener('click', function () { changeStateBtnEdit(inputItem, btn_edit) }, false);
        divItem.appendChild(btn_edit);
        const btn_delete = document.createElement("button");
        btn_delete.classList.add('btn', 'btn-danger', 'boton-remover');
        btn_delete.innerHTML = `<i class="bi bi-trash3"></i>`;
        // agrego el evento y la función para el boton eliminar
        btn_delete.addEventListener('click', function () { deleteTaskLocalStorage(inputItem, divItem) }, false);
        divItem.appendChild(btn_delete);
        // Agrego todo
        container.appendChild(divItem);
    }
}

// Eventos de botón
btn_add.addEventListener('click', function () {
    checkInput();
});

// Evento de input
input.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        checkInput();
    }
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
        editTaskLocalStorage(inputItem);
    }
}

/**
 * Función para chequear si el input está vacío o no
 */
function checkInput() {
    if (input.value.length === 0) {
        alert("Ingrese un valor");
    } else {
        const item = new Item(input.value.trim());
        saveTaskLocalStorage(input);
        input.value = "";
    }
}

/**
 * Función para mostrar las tareas guardadas en el localStorage
 */
function getTasks() {
    arrTasks = JSON.parse(localStorage.getItem('tasks'));
    for (let task of arrTasks) {
        const item = new Item(task);
    }
}

/**
 * Función para guardar los datos en el localStorage
 */
function saveTaskLocalStorage() {
    if (localStorage.getItem('tasks') === null) {
        arrTasks.push(input.value.trim());
        localStorage.setItem('tasks', JSON.stringify(arrTasks));
    } else {
        arrTasks = JSON.parse(localStorage.getItem('tasks'));
        arrTasks.push(input.value.trim());
        localStorage.setItem('tasks', JSON.stringify(arrTasks));
    }
}

/**
 * Función para editar las tareas especificas en el localStorage
 * @param {*} inputItem tarea a editar
 */
function editTaskLocalStorage(inputItem) {
    for (let i = 0; i < arrTasks.length; i++) {
        if (arrTasks[i] === inputItem.oldvalue) {
            arrTasks[i] = inputItem.value.trim();
        }
    }
    localStorage.setItem('tasks', JSON.stringify(arrTasks));
}

/**
 * Función para eliminar un elemento dentro de localStorage
 * @param {*} inputItem tarea a eliminar
 * @param {*} divItem div contenedor de la tarea a eliminar
 */
function deleteTaskLocalStorage(inputItem, divItem) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i] === inputItem.value.trim()) {
            tasks.splice(i, 1);
        }
    }
    if (divItem.classList.contains('item')) {
        divItem.remove();
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Precarga de las tareas dentro del localStorage
getTasks();