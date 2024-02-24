import { gql } from "@apollo/client"
export const GET_COMMENTS_BY_POST = gql`
  query GetCommentsByPost($postId: Float!) {
    getCommentsByPost(postId: $postId) {
      id
      text
      createdAt
      user {
        image
        id
        fullname
        email
      }
      post {
        id
        text
        video
      }
    }
  }
`