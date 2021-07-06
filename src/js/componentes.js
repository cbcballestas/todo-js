import { Todo } from "../classes";
import { todoList } from '../index';

//Referencias HTML
const divTodoList = document.querySelector('.todo-list');
const txtNuevoTodo = document.querySelector('.new-todo');
const btnClearCompleted = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

/**
 * Agrega TODO a la vista
 * @param {Todo} todo 
 */
export const crearTodoHtml = (todo) => {
	const htmlTodo =
		`<li class="${todo.completado ? 'completed' : ''}" data-id="${todo.id}">
					<div class="view">
						<input class="toggle" type="checkbox" ${todo.completado ? 'checked' : ''}>
						<label>${todo.tarea}</label>
						<button class="destroy"></button>
					</div>
				<input class="edit" value="Create a TodoMVC template">
	  </li>`;

	const div = document.createElement('div');
	div.innerHTML = htmlTodo;

	divTodoList.append(div.firstElementChild);

	return div.firstElementChild;

}

// NOTE: Eventos

txtNuevoTodo.addEventListener('keyup', (event) => {
	if (event.keyCode === 13 && txtNuevoTodo.value.length > 0) {
		const nuevoTodo = new Todo(txtNuevoTodo.value);
		todoList.nuevoTodo(nuevoTodo);

		crearTodoHtml(nuevoTodo);
		txtNuevoTodo.value = '';
	}
});

divTodoList.addEventListener('click', (event) => {
	const nombreElemento = event.target.localName; // input,label,button
	const todoElemento = event.target.parentElement.parentElement;
	const todoId = todoElemento.getAttribute('data-id');

	// En caso de que se halla dado click en el checkbox
	if (nombreElemento.includes('input')) {
		todoList.marcarCompletado(todoId);
		todoElemento.classList = 'completed'
	} else if (nombreElemento.includes('button')) {
		// En caso de que se halla dado click en el botón
		todoList.borrarTodo(todoId);
		divTodoList.removeChild(todoElemento); // remueve elemento de la lista de TODO
	}

});

//NOTE: Eliminar completados
btnClearCompleted.addEventListener('click', () => {
	todoList.borrarCompletados(); // Se borra lista completados en memoria

	//NOTE: Se recorren los elementos hijos de divTodoList (Lista de todos)
	for (let i = divTodoList.children.length - 1; i >= 0; i--) {
		const elemento = divTodoList.children[i];

		// Se verifica si el todo ya está completado (mirando si el elemento tiene la clase 'completed')
		if (elemento.classList.contains('completed')) {
			divTodoList.removeChild(elemento); // remueve elemento de la lista de TODO del DOM
		}

	}
});

//NOTE: Filtro por tipo de TODO
ulFiltros.addEventListener('click', (event) => {
	const filtro = event.target.text;

	if (!filtro) { return; }

	// Se aplica clase CSS para filtro activo
	anchorFiltros.forEach(item => item.classList.remove('selected'));
	event.target.classList.add('selected');

	// Se recorre cada elemento li asignar o remover clases CSS dependiendo del filtro
	for (const elemento of divTodoList.children) {
		elemento.classList.remove('hidden');
		const completado = elemento.classList.contains('completed');

		// Se ocultan los elementos dependiendo del filtro
		switch (filtro) {
			case 'Pendientes':
				if (completado) {
					elemento.classList.add('hidden');
				}
				break;
			case 'Completados':
				if (!completado) {
					elemento.classList.add('hidden');
				}
		}

	}

});