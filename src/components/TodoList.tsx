import { Spinner, VStack } from "@chakra-ui/react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_TODO, DELETE_TODO, UPDATE_TODO } from "../apollo/todos";
import {
  AllTodosResponse,
  DeleteTodoResponse,
  UpdateTodoResponse,
  Todo,
} from "../types/general.types";
import TodoItem from "./TodoItem";
import TotalCount from "./TotalCount";

const TodoList = () => {
  const { loading, error, data } = useQuery<AllTodosResponse>(ALL_TODO);

  const [toggleTodo, { error: updateError }] =
    useMutation<UpdateTodoResponse>(UPDATE_TODO);

  const [removeTodo, { error: deleteError }] = useMutation<DeleteTodoResponse>(
    DELETE_TODO,
    {
      update(cache, { data: deleteData }) {
        if (!deleteData) return;

        const removedTodoId = deleteData.removeTodo.id;

        // Явное обновление кеша
        cache.writeQuery({
          query: ALL_TODO,
          data: {
            allTodos: (data?.allTodos || []).filter(
              (todo) => todo.id !== removedTodoId
            ),
          },
        });
      },
    }
  );

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <h2>Error: {error.message}</h2>;
  }

  if (updateError) {
    return <h2>Error: {updateError.message}</h2>;
  }

  if (deleteError) {
    return <h2>Error: {deleteError.message}</h2>;
  }

  return (
    <>
      <VStack spacing={2} mt={4}>
        {data?.allTodos.map((todo: Todo) => (
          <TodoItem
            key={todo.id}
            onToggle={toggleTodo}
            onDelete={removeTodo}
            {...todo}
          />
        ))}
      </VStack>
      <TotalCount />
    </>
  );
};

export default TodoList;
