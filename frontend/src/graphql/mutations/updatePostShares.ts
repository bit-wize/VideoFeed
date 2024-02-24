import { gql } from "@apollo/client"
export const UPDATE_POST_SHARES = gql`
  mutation UpdatePostShares($id: Float!) {
    updatePostShares(id: $id) {
      id
      __typename
      shares
      
    }
  }
`