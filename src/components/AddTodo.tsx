import { Button, FormControl, Input } from "@chakra-ui/react";
import { useState, KeyboardEvent } from "react";
import { useMutation } from "@apollo/client";
import { ADD_TODO, ALL_TODO } from "../apollo/todos";
import { AllTodosResponse, Todo } from "../types/general.types";

interface AddTodoResponse {
  newTodo: Todo;
}

const AddTodo = () => {
  const [text, setText] = useState<string>("");

  const [addTodo, { error }] = useMutation<AddTodoResponse>(ADD_TODO, {
    update(cache, { data }) {
      if (!data) return;

      const { newTodo } = data;

      const allTodosResponse = cache.readQuery<AllTodosResponse>({
        query: ALL_TODO,
      });

      const allTodos = allTodosResponse?.allTodos || [];

      cache.writeQuery({
        query: ALL_TODO,
        data: {
          allTodos: [newTodo, ...allTodos],
        },
      });
    },
  });

  if (error) {
    return <h2>Error: {error.message}</h2>;
  }

  const handleAddTodo = (): void => {
    if (text.trim().length) {
      addTodo({
        variables: {
          title: text,
          completed: false,
          userId: 101,
        },
      });
      setText("");
    }
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") handleAddTodo();
  };

  return (
    <FormControl display={"flex"} mt={6}>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKey}
      />
      <Button onClick={handleAddTodo}>Add todo</Button>
    </FormControl>
  );
};

export default AddTodo;
