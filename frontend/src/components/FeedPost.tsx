import React from "react"
import { AiOutlineLike } from "react-icons/ai"
import { FaRegCommentAlt } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa6";
import { PostType, UpdatePostSharesMutation } from "../gql/graphql"
import { Link } from "react-router-dom"
import { useMutation, useQuery } from "@apollo/client"
import { GetCommentsByPostQuery } from "../gql/graphql"
import { GET_COMMENTS_BY_POST } from "../graphql/queries/GetCommentsByPost"
import { UPDATE_POST_SHARES } from "../graphql/mutations/updatePostShares"
import { toast } from "react-toastify"

function FeedPost({ post }: { post: PostType }) {
  const video = React.useRef<HTMLVideoElement>(null)
  const [updatePostSharesMutation] = useMutation<UpdatePostSharesMutation>(UPDATE_POST_SHARES);
  const { data } = useQuery<GetCommentsByPostQuery>(
    GET_COMMENTS_BY_POST,
    {
      variables: { postId: post.id },
    }
  )
  console.log(data)

  React.useEffect(() => {
    video.current?.play()
  }, [])


  const handleShareClick = async () => {
    const postLink = `${window.location.origin}/post/${post.id}`;
    try {
      await updatePostSharesMutation({
        variables: {
          id: post.id
        },
      });
      navigator.clipboard.writeText(postLink).then(() => toast.success("Post link copied to clipboard"));
    } catch (e) {
      console.error("Error copying post link:", e);
    }
  };


  return (
    <div id="PostMain" className="flex  border-b py-6 justify-center ">
      <div className="cursor-pointer">
        {post.user.image && (
          <Link to={`/profile/${post.user.id}`}>
            <img
              className="border-2 rounded-full object-cover max-h-[60px] hover:border-[#a855f7] focus:border-[#a855f7]"
              width="60"
              src={post.user.image}
              alt="User Profile"
            />
          </Link>

        )}
      </div>
      <div className="pl-3 w-full px-4">
        <div className="flex items-center justify-between pb-0.5">
          <Link to={`/profile/${post.user.id}`}>
            <span className="font-bold hover:underline cursor-pointer">
              {post.user.fullname}
            </span>
          </Link>
        </div>
        <div className="text-[15px] pb-0.5 break-words md:max-w-[480px] max-w-[300px]">
          {post.text}
        </div>
        <div className="mt-2.5 flex">
          <div className="relative min-h-[480px] max-h-[580px] max-w-[480px] min-w-[280px] flex items-center bg-black rounded-xl">
            <video
              ref={video}
              src={"http://localhost:3000/" + post.video}
              loop
              className="rounded-xl object-cover mx-auto h-full"
            />
          </div>
          <div className="relative mr-[75px]">
            <div className="absolute bottom-0 pl-2">
              <div className="flex flex-col items-center mb-5">
                <button className="cursor-pointer">
                  <AiOutlineLike size="25" className="text-[#838383] focus:text-[#a855f7] hover:text-[#a855f7]" title="Like"/>
                </button>
                <span className="text-xs text-gray-800 font-semitbold">
                  {post.likes?.length}
                </span>
              </div>

              <div className="flex flex-col items-center mb-5">
              <button
                className="cursor-pointer">
                <FaRegCommentAlt size="25" className="text-[#838383] focus:text-[#a855f7] hover:text-[#a855f7]" title="Copy Post Link"/>
              </button>
              <span className="text-xs text-gray-800 font-semitbold">
                {" "}
                {data?.getCommentsByPost.length}
              </span>
              </div>

              <div className="flex flex-col items-center mb-5">
                <button className="cursor-pointer" onClick={handleShareClick}>
                  <FaRegCopy size="25" className="text-[#838383] focus:text-[#a855f7] hover:text-[#a855f7]"/>
                </button>
                <span className="text-xs text-gray-800 font-semitbold">{post.shares}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedPost;
