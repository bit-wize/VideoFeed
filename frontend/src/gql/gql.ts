/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CreatePost($text: String!, $video: Upload!) {\n    createPost(text: $text, video: $video) {\n      id\n      text\n      video\n    }\n  }\n": types.CreatePostDocument,
    "\n  mutation CreateComment($text: String!, $postId: Float!) {\n    createComment(text: $text, postId: $postId) {\n      text\n      id\n      createdAt\n      user {\n        id\n        fullname\n        email\n      }\n      post {\n        id\n        text\n        video\n      }\n    }\n  }\n": types.CreateCommentDocument,
    "\n  mutation DeleteComment($id: Float!) {\n    deleteComment(id: $id) {\n      id\n      __typename\n    }\n  }\n": types.DeleteCommentDocument,
    "\n  mutation DeletePost($id: Float!) {\n    deletePost(id: $id) {\n      id\n      __typename\n    }\n  }\n": types.DeletePostDocument,
    "\n  mutation Like($postId: Float!) {\n    like(postId: $postId) {\n      id\n      userId\n      postId\n    }\n  }\n": types.LikeDocument,
    "\n  mutation LoginUser($email: String!, $password: String!) {\n    login(loginInput: { email: $email, password: $password }) {\n      user {\n        email\n        id\n        fullname\n      }\n    }\n  }\n": types.LoginUserDocument,
    "\n  mutation LogoutUser {\n    logout\n  }\n": types.LogoutUserDocument,
    "\n  mutation RegisterUser(\n    $fullname: String!\n    $email: String!\n    $password: String!\n    $confirmPassword: String!\n  ) {\n    register(\n      registerInput: {\n        fullname: $fullname\n        email: $email\n        password: $password\n        confirmPassword: $confirmPassword\n      }\n    ) {\n      user {\n        id\n        fullname\n        email\n      }\n    }\n  }\n": types.RegisterUserDocument,
    "\n  mutation Unlike($postId: Float!) {\n    unlike(postId: $postId) {\n      id\n      userId\n      postId\n    }\n  }\n": types.UnlikeDocument,
    "\n  mutation UpdatePostShares($id: Float!) {\n    updatePostShares(id: $id) {\n      id\n      __typename\n      shares\n      \n    }\n  }\n": types.UpdatePostSharesDocument,
    "\n  mutation UpdateProfile(\n    $fullname: String!\n    $bio: String!\n    $image: Upload\n  ) {\n    updateProfile(fullname: $fullname, bio: $bio, image: $image) {\n      id\n      fullname\n      bio\n      image\n    }\n  }\n": types.UpdateProfileDocument,
    "\n  query GetAllPosts($skip: Int!, $take: Int!) {\n    getAllPosts(skip: $skip, take: $take) {\n      id\n      text\n      video\n      shares\n      user {\n        image\n        id\n        fullname\n        email\n      }\n      likes {\n        id\n        userId\n        postId\n      }\n    }\n  }\n": types.GetAllPostsDocument,
    "\nquery GetAllUsers{\n    getAllUsers{\n        id\n        fullname\n        email\n        image\n        bio\n        \n    }\n}\n": types.GetAllUsersDocument,
    "\n  query GetCommentsByPost($postId: Float!) {\n    getCommentsByPost(postId: $postId) {\n      id\n      text\n      createdAt\n      user {\n        image\n        id\n        fullname\n        email\n      }\n      post {\n        id\n        text\n        video\n      }\n    }\n  }\n": types.GetCommentsByPostDocument,
    "\n  query GetPost($id: Float!) {\n    getPost(id: $id) {\n      id\n      text\n      video\n      createdAt\n      shares\n      user {\n        image\n        id\n        email\n        fullname\n      }\n      likes {\n        id\n        userId\n        postId\n      }\n      otherPostIds\n    }\n  }\n": types.GetPostDocument,
    "\n  query getPostsByUser($userId: Float!) {\n    getPostsByUser(userId: $userId) {\n      id\n      text\n      video\n      shares\n      user {\n        image\n        fullname\n        email\n        id\n      }\n    }\n  }\n": types.GetPostsByUserDocument,
    "\n  query GetUser($userId: Int!) {\n    getUser(id: $userId) {\n      id\n      fullname\n      image\n      bio\n      email\n      createdAt      \n    }\n  }\n": types.GetUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePost($text: String!, $video: Upload!) {\n    createPost(text: $text, video: $video) {\n      id\n      text\n      video\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePost($text: String!, $video: Upload!) {\n    createPost(text: $text, video: $video) {\n      id\n      text\n      video\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateComment($text: String!, $postId: Float!) {\n    createComment(text: $text, postId: $postId) {\n      text\n      id\n      createdAt\n      user {\n        id\n        fullname\n        email\n      }\n      post {\n        id\n        text\n        video\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateComment($text: String!, $postId: Float!) {\n    createComment(text: $text, postId: $postId) {\n      text\n      id\n      createdAt\n      user {\n        id\n        fullname\n        email\n      }\n      post {\n        id\n        text\n        video\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteComment($id: Float!) {\n    deleteComment(id: $id) {\n      id\n      __typename\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteComment($id: Float!) {\n    deleteComment(id: $id) {\n      id\n      __typename\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeletePost($id: Float!) {\n    deletePost(id: $id) {\n      id\n      __typename\n    }\n  }\n"): (typeof documents)["\n  mutation DeletePost($id: Float!) {\n    deletePost(id: $id) {\n      id\n      __typename\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Like($postId: Float!) {\n    like(postId: $postId) {\n      id\n      userId\n      postId\n    }\n  }\n"): (typeof documents)["\n  mutation Like($postId: Float!) {\n    like(postId: $postId) {\n      id\n      userId\n      postId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LoginUser($email: String!, $password: String!) {\n    login(loginInput: { email: $email, password: $password }) {\n      user {\n        email\n        id\n        fullname\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation LoginUser($email: String!, $password: String!) {\n    login(loginInput: { email: $email, password: $password }) {\n      user {\n        email\n        id\n        fullname\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LogoutUser {\n    logout\n  }\n"): (typeof documents)["\n  mutation LogoutUser {\n    logout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RegisterUser(\n    $fullname: String!\n    $email: String!\n    $password: String!\n    $confirmPassword: String!\n  ) {\n    register(\n      registerInput: {\n        fullname: $fullname\n        email: $email\n        password: $password\n        confirmPassword: $confirmPassword\n      }\n    ) {\n      user {\n        id\n        fullname\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RegisterUser(\n    $fullname: String!\n    $email: String!\n    $password: String!\n    $confirmPassword: String!\n  ) {\n    register(\n      registerInput: {\n        fullname: $fullname\n        email: $email\n        password: $password\n        confirmPassword: $confirmPassword\n      }\n    ) {\n      user {\n        id\n        fullname\n        email\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Unlike($postId: Float!) {\n    unlike(postId: $postId) {\n      id\n      userId\n      postId\n    }\n  }\n"): (typeof documents)["\n  mutation Unlike($postId: Float!) {\n    unlike(postId: $postId) {\n      id\n      userId\n      postId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdatePostShares($id: Float!) {\n    updatePostShares(id: $id) {\n      id\n      __typename\n      shares\n      \n    }\n  }\n"): (typeof documents)["\n  mutation UpdatePostShares($id: Float!) {\n    updatePostShares(id: $id) {\n      id\n      __typename\n      shares\n      \n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateProfile(\n    $fullname: String!\n    $bio: String!\n    $image: Upload\n  ) {\n    updateProfile(fullname: $fullname, bio: $bio, image: $image) {\n      id\n      fullname\n      bio\n      image\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateProfile(\n    $fullname: String!\n    $bio: String!\n    $image: Upload\n  ) {\n    updateProfile(fullname: $fullname, bio: $bio, image: $image) {\n      id\n      fullname\n      bio\n      image\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllPosts($skip: Int!, $take: Int!) {\n    getAllPosts(skip: $skip, take: $take) {\n      id\n      text\n      video\n      shares\n      user {\n        image\n        id\n        fullname\n        email\n      }\n      likes {\n        id\n        userId\n        postId\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllPosts($skip: Int!, $take: Int!) {\n    getAllPosts(skip: $skip, take: $take) {\n      id\n      text\n      video\n      shares\n      user {\n        image\n        id\n        fullname\n        email\n      }\n      likes {\n        id\n        userId\n        postId\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetAllUsers{\n    getAllUsers{\n        id\n        fullname\n        email\n        image\n        bio\n        \n    }\n}\n"): (typeof documents)["\nquery GetAllUsers{\n    getAllUsers{\n        id\n        fullname\n        email\n        image\n        bio\n        \n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCommentsByPost($postId: Float!) {\n    getCommentsByPost(postId: $postId) {\n      id\n      text\n      createdAt\n      user {\n        image\n        id\n        fullname\n        email\n      }\n      post {\n        id\n        text\n        video\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCommentsByPost($postId: Float!) {\n    getCommentsByPost(postId: $postId) {\n      id\n      text\n      createdAt\n      user {\n        image\n        id\n        fullname\n        email\n      }\n      post {\n        id\n        text\n        video\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPost($id: Float!) {\n    getPost(id: $id) {\n      id\n      text\n      video\n      createdAt\n      shares\n      user {\n        image\n        id\n        email\n        fullname\n      }\n      likes {\n        id\n        userId\n        postId\n      }\n      otherPostIds\n    }\n  }\n"): (typeof documents)["\n  query GetPost($id: Float!) {\n    getPost(id: $id) {\n      id\n      text\n      video\n      createdAt\n      shares\n      user {\n        image\n        id\n        email\n        fullname\n      }\n      likes {\n        id\n        userId\n        postId\n      }\n      otherPostIds\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPostsByUser($userId: Float!) {\n    getPostsByUser(userId: $userId) {\n      id\n      text\n      video\n      shares\n      user {\n        image\n        fullname\n        email\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query getPostsByUser($userId: Float!) {\n    getPostsByUser(userId: $userId) {\n      id\n      text\n      video\n      shares\n      user {\n        image\n        fullname\n        email\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUser($userId: Int!) {\n    getUser(id: $userId) {\n      id\n      fullname\n      image\n      bio\n      email\n      createdAt      \n    }\n  }\n"): (typeof documents)["\n  query GetUser($userId: Int!) {\n    getUser(id: $userId) {\n      id\n      fullname\n      image\n      bio\n      email\n      createdAt      \n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;