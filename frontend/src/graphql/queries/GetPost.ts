import { gql } from "@apollo/client"
export const GET_POST= gql`
  query GetPost($id: Float!) {
    getPost(id: $id) {
      id
      text
      video
      createdAt
      shares
      user {
        image
        id
        email
        fullname
      }
      likes {
        id
        userId
        postId
      }
      otherPostIds
    }
  }
`