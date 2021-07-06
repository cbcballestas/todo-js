export class Todo {

  /**
   * Reconstruye la instancia de los TODOS obtenidos del
   * localStorage.
   * @param {Todo} todo
   * @return tempTodo 
   */
  static fromLocalStorage({id,tarea,completado,creado}){
    const tempTodo      = new Todo(tarea);
    tempTodo.id         = id;
    tempTodo.completado = completado;
    tempTodo.creado     = creado;

    return tempTodo;
  }

  constructor(tarea) {
    this.tarea      = tarea;
    this.id         = new Date().getTime();
    this.completado = false; 
    this.creado     = new Date();
  }

  imprimirTarea(){
    return `${this.tarea} - ${this.id}`;
  }
}