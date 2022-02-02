import { gql } from "@apollo/client";

export const ALL_TODO = gql`
  query getTodoList($userId: String!, $size: Float!, $page: Float!) {
    getTodoList(userId: $userId, page: $page, size: $size) {
      id
      name
      completed
    }
  }
`;





