import { useQuery } from "@apollo/client";
import { Flex } from "@chakra-ui/react";
import { ALL_TODO } from "../apollo/todos";

const TotalCount = () => {
  const { data } = useQuery(ALL_TODO);

  return (
    <Flex justifyContent={"center"} borderTop={"2px"} mt="5">
      {data?.allTodos && <b>Total todos: {data.allTodos.length}</b>}
    </Flex>
  );
};
export default TotalCount;
