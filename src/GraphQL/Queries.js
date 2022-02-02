import { gql } from "@apollo/client";

export const ALL_TODO = gql`
  query getTodoList($userId: String!, $page: Float!, $size: Float!) {
    getTodoList(userId: $userId, page: $page, size: $size) {
      id
      name
      completed
    }
  }
`;