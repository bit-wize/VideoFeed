import { gql } from "@apollo/client"
export const UNLIKE_POST = gql`
  mutation Unlike($postId: Float!) {
    unlike(postId: $postId) {
      id
      userId
      postId
    }
  }
`