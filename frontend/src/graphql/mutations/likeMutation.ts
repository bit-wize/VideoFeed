import { gql } from "@apollo/client"
export const LIKE_POST = gql`
  mutation Like($postId: Float!) {
    like(postId: $postId) {
      id
      userId
      postId
    }
  }
`