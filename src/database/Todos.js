export class TodosModel {
  name = 'Todos';

  props = {
    task_name: 'string',
    deadline: 'datetime',
    start_time: 'datetime',
    end_time: 'datetime',
    remind: 'int',
    repeat: 'int',
    completed: 'boolean',
  };
}
