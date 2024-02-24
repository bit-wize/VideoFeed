import React, { useEffect } from "react"
import MainLayout from "../layouts/MainLayout"
import { GET_ALL_POSTS } from "../graphql/queries/GetAllPosts"
import { useQuery } from "@apollo/client"
import FeedPost from "../components/FeedPost"
import { PostType } from "../gql/graphql"

function Feed() {
  const loadMoreRef = React.useRef(null)

  const { data, fetchMore } = useQuery(GET_ALL_POSTS)

  const loadMorePosts = async () => {
    try {
      await fetchMore({
        variables: {
          skip: data?.getAllPosts.length || 0,
          take: 2,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          const prevPosts = prev?.getAllPosts || [];
          const newPosts = fetchMoreResult.getAllPosts.filter(
            (newPost: PostType) => !prevPosts.some((post: PostType) => post.id === newPost.id)
          );

          console.log([...prevPosts, ...newPosts])

          return {
            getAllPosts: [...prevPosts, ...newPosts],
          };
        },
      });
      console.log(data);
    } catch (error) {
      console.error("Error fetching more posts:", error);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePosts()
        }
      },
      { threshold: 1 }
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current)
      }
    }
  }, [loadMorePosts])

  return (
    <MainLayout>
      <div className="mt-20 justify-center flex flex-col items-center p-4"> 
        {data?.getAllPosts.map((post: PostType, index: number) => (
          <FeedPost key={index} post={post} />
        ))}
      </div>
      <div className="mt-20 justify-center" ref={loadMoreRef}>
      </div>
    </MainLayout>
  );

}

export default Feed