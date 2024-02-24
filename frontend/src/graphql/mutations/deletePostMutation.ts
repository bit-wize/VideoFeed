import { gql } from "@apollo/client"

export const DELETE_Post = gql`
  mutation DeletePost($id: Float!) {
    deletePost(id: $id) {
      id
      __typename
    }
  }
`