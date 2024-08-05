export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface AllTodosResponse {
  allTodos: Todo[];
}

export interface UpdateTodoResponse {
  updateTodo: Todo;
}

export interface DeleteTodoResponse {
  removeTodo: {
    id: number;
  };
}
