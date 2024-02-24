import {gql} from '@apollo/client'

export const GET_USER = gql`
  query GetUser($userId: Int!) {
    getUser(id: $userId) {
      id
      fullname
      image
      bio
      email
      createdAt      
    }
  }
`;