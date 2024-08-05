import { Spinner, VStack } from "@chakra-ui/react";
import { useQuery, useMutation } from "@apollo/client";

import TotalCount from "./TotalCount";
import TodoItem from "./TodoItem";
import { ALL_TODO, DELETE_TODO, UPDATE_TODO } from "../apollo/todos";

const TodoList = () => {
  const { loading, error, data } = useQuery(ALL_TODO);

  const [toggleTodo, { error: updateError }] = useMutation(UPDATE_TODO);

  const [removeTodo, { error: deleteError }] = useMutation(DELETE_TODO, {
    update(cache, { data: { removeTodo } }) {
      cache.modify({
        fields: {
          allTodos(currentTodos = []) {
            return currentTodos.filter(
              (todo) => todo.__ref !== `Todo:${removeTodo.id}`
            );
          },
        },
      });
    },
  });

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
        {data.allTodos.map((todo) => (
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
