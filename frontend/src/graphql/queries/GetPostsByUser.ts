import { gql } from "@apollo/client"
export const GET_POSTS_BY_USER= gql`
  query getPostsByUser($userId: Float!) {
    getPostsByUser(userId: $userId) {
      id
      text
      video
      shares
      user {
        image
        fullname
        email
        id
      }
    }
  }
`