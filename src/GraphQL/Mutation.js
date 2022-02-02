import { gql } from "@apollo/client";

export const ADD_TODO = gql`
  mutation newTodo($input: TodoInput!, $userId: String!) {
    addTodo(userId: $userId, input: $input) {
      id
      userId
      name
      completed
    }
  }
`;  

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: String!) {
    deleteTodo(id: $id) {
      id
      userId
      name
      completed
    }
  }
`;  

export const DELETE_COMPLITED_TODO = gql`
  mutation DeleteCompleted($userId: String!) {
    deleteCompleted(userId: $userId) {
      deletedCount
    }
  }
`;  

export const CHANGE_TODO = gql`
  mutation EditTodo($id: String!, $input: TodoInput!) {
    editTodo(id: $id, input: $input) {
      id
      userId
      name
      completed
    }
  }
`;  

export const COMPLETED_TODO = gql`
  mutation EditTodo($id: String!, $input: TodoInput!) {
    editTodo(id: $id, input: $input) {
      id
      userId
      name
      completed
    }
  }
`;  

export const COMPLETED_All_TODO = gql`
  mutation ToggleTodos($userId: String!, $allCompleted: Boolean!) {
    toggleTodos(userId: $userId, allCompleted: $allCompleted) {
      modifiedCount
    }
  }
`;  









