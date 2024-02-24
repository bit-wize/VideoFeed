import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './input.css'
import Upload from './pages/Upload.tsx'
import Profile from './pages/Profile.tsx'
import Post from './pages/Post.tsx'
import Feed from './pages/Feed.tsx'

import { createBrowserRouter, Routes, Route, RouterProvider } from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes.tsx'
import { ApolloProvider } from '@apollo/client'
import { client } from './utils/apolloClient.ts'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <Feed />
      </ProtectedRoutes>
    ),
  },

  {
    path: "/upload",
    element: (
      <ProtectedRoutes>
        <Upload />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/profile/:id",
    element: <Profile />,
  },
  {
    path: "/post/:id",
    element: <Post />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
      <App />
    </ApolloProvider>
  </React.StrictMode>,
)
