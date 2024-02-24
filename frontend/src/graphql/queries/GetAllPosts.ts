import { gql } from "@apollo/client"
export const GET_ALL_POSTS = gql`
  query GetAllPosts($skip: Int!, $take: Int!) {
    getAllPosts(skip: $skip, take: $take) {
      id
      text
      video
      shares
      user {
        image
        id
        fullname
        email
      }
      likes {
        id
        userId
        postId
      }
    }
  }
`