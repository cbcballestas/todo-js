import './styles.css';

import { TodoList } from './classes';
import { crearTodoHtml } from './js/componentes';

//NOTE: Lista principal donde se guardan los TODO
export const todoList = new TodoList();

// Se agregan a la vista los TODOS de la lista
todoList.todos.forEach(crearTodoHtml);

// console.log(todoList.todos[0].imprimirTarea());
