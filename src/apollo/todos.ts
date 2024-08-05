import { gql } from "@apollo/client";

export const ALL_TODO = gql`
  query AllTodos {
    allTodos {
      id
      title
      completed
    }
  }
`;

export const ADD_TODO = gql`
  mutation AddTodo($title: String!, $userId: Int!, $completed: Boolean!) {
    newTodo: createTodo(title: $title, userId: $userId, completed: $completed) {
      id
      userId
      title
      completed
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation updateTodo($id: ID!, $completed: Boolean) {
    updateTodo(id: $id, completed: $completed) {
      id
      title
      completed
    }
  }
`;

export const DELETE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    removeTodo(id: $id) {
      id
    }
  }
`;
