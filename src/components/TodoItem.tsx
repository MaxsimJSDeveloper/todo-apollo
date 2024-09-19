import { Checkbox, CloseButton, HStack, Text } from "@chakra-ui/react";
import { Todo } from "../types/general.types";

interface TodoItemProps extends Todo {
  onToggle: (options: {
    variables: { id: number; completed: boolean };
  }) => void;
  onDelete: (options: { variables: { id: number } }) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  title,
  completed,
  onToggle,
  onDelete,
}) => {
  return (
    <HStack spacing={3}>
      <Checkbox
        isChecked={completed}
        onChange={() =>
          onToggle({
            variables: {
              id,
              completed: !completed,
            },
          })
        }
      />
      <Text>{title}</Text>
      <CloseButton
        onClick={() =>
          onDelete({
            variables: {
              id,
            },
          })
        }
      />
    </HStack>
  );
};

export default TodoItem;
