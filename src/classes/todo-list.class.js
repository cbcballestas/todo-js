import { Todo } from "./todo.class";

export class TodoList {
  constructor() {
    // this.todos = [];
    this.cargarLocalStorage();
  }

  /**
   * Realiza el guardado de un TODO a la lista
   * @param {Todo} todo 
   */
  nuevoTodo(todo) {
    this.todos.push(todo);
    this.guardarLocalStorage();
  }

  /**
   * Método que se encarga de borrar un TODO de la lista
   * @param {number} id 
   */
  borrarTodo(id) {
    this.todos = this.todos.filter(todo => todo.id != id);
    this.guardarLocalStorage();
  }

  /**
   * Marca como completado un TODO
   * @param {number} id 
   */
  marcarCompletado(id) {
    for (const todo of this.todos) {
      if (todo.id == id) {
        todo.completado = !todo.completado;
        this.guardarLocalStorage();
        break;
      }
    }
  }

  /**
   * Realiza el borrado de los TODOS YA completados
   */
  borrarCompletados() {
    this.todos = this.todos.filter(todo => !todo.completado);
    this.guardarLocalStorage();
  }

  /**
   * Realiza el guardado de los TODOS en
   * el localStorage
   */
  guardarLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  /**
   * Realiza la carga de los TODOS guardados en el
   * localStorage
   */
  cargarLocalStorage() {

    /**
     * Se verifica si existen registros en el localStorage ( en caso que NO se carga un array vacio) y luego se asignan a la lista principal  
     */
    this.todos = (localStorage.getItem('todos'))
      ? JSON.parse(localStorage.getItem('todos'))
      : [];

    this.todos = this.todos.map(Todo.fromLocalStorage);
  }

}