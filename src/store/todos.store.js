import { computed, action, runInAction, makeAutoObservable } from 'mobx';
import { Todos } from '../database';
import moment from 'moment';

class TodosStore {
  todos = [];

  constructor() {
    makeAutoObservable(this, {
      addTodo: action.bound,
      fetchTodosLocal: action.bound,
      updateTodoCompleted: action.bound,
      removeTask: action.bound,
      updateTask: action.bound,
    });
  }

  get getTodosCompleted() {
    // Lọc các todos ở trạng thái đã hoàn thành
    return computed(() => this.todos.filter(t => t.completed)).get();
  }

  get getTodosUncompleted() {
    return computed(() => this.todos.filter(t => t.completed === false)).get();
  }

  get getStatistics() {
    return [
      {
        name: 'Completed',
        population: this.getTodosCompleted?.length || 0,
        color: 'rgba(131, 45, 234, 1)',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Uncompleted',
        population: this.getTodosUncompleted?.length || 0,
        color: 'rgba(131, 167, 234, 1)',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
    ];
  }

  fetchTodosLocal() {
    // Cập nhật dữ liệu todos từ local vào store của Todos
    Todos.onLoaded(() => {
      let todosLocal = Todos.filter();
      runInAction(() => {
        this.todos = todosLocal._data;
      });
    });
  }

  addTodo(value) {
    // Update data to store
    let newTodos = [...this.todos]; // newTodos = coppy của this.todos (không nên chỉnh sửa trực tiếp vào trong this.todos)
    newTodos.push({
      ...value,
      id: String(moment().unix()),
    });
    this.todos = newTodos;

    // Save data to local
    Todos.insert(value);
  }

  updateTodoCompleted(item) {
    // Cập nhật completed của todo có id = id
    let newTodos = [...this.todos];
    this.todos = newTodos.map(todo => {
      if (todo.id === item.id) {
        return {
          ...todo,
          completed: !item.completed,
        };
      }
      return todo;
    });

    // Update record where id = id
    Todos.update(item.id, { completed: !item.completed });
  }

  updateTask(id, task_name) {
    // Cập nhật completed của todo có id = id
    let newTodos = [...this.todos];
    this.todos = newTodos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          task_name,
        };
      }
      return todo;
    });

    // Update record where id = id
    Todos.update(id, { task_name });
  }

  removeTask(item) {
    let removeTask = [...this.todos].filter(todo => todo.id !== item.id);
    this.todos = removeTask;

    Todos.remove(item);
  }
}

export default new TodosStore();
