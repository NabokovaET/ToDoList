import { gql } from "@apollo/client";

export const ALL_TODO = gql`
  query getTodoList {
    getTodoList( userId:"61eebcd8a993c3d6ab294bf6", page: 1, size: 5) {
      id
      name
      completed
    }
  }
`;

