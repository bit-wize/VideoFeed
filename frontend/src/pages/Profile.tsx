import React, { useEffect } from "react"
import MainLayout from "../layouts/MainLayout"
import { BsFillPencilFill } from "react-icons/bs"
import UserPost from "../components/UserPost"
import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { useUserStore } from "../stores/userStore"
import useGeneralStore from "../stores/generalStore"
import { GET_USER } from "../graphql/queries/GetUser"
import { GetPostsByUserQuery, GetUserQuery } from "../gql/graphql"
import { GET_POSTS_BY_USER } from "../graphql/queries/GetPostsByUser"

function Profile() {
  const { id } = useParams<{ id: string }>()

  const profileUser = useQuery<GetUserQuery>(
    GET_USER,
    {
      variables: { userId: Number(id) },
    }
  ).data?.getUser;
  const currentUser = useUserStore((state) => state)

  const { data, loading, error } = useQuery<GetPostsByUserQuery>(GET_POSTS_BY_USER, {
    variables: {
      userId: Number(id),
    }
  })

  console.log(profileUser?.fullname)
  const showEditButton = (profileUser?.id === currentUser?.id)
  const isEditOverlayOpen = useGeneralStore((state) => state.isEditProfileOpen)
  const setIsEditOverlayOpen = useGeneralStore(
    (state) => state.setIsEditProfileOpen
  )
  return (
    <MainLayout>
      <MainLayout>
        <div className="pt-[90px] 2xl:pl-[385px] lg:pl-[260px] pl-[80px] lg:pr-0 pr-2 w-[calc(100%-10px)] max-w-1800px 2xl:mx-auto">
          <div className="flex w-[calc(100vw-230px)]">
            {profileUser?.image && (
              <img
                className="w-[100] h-[100px] rounded-full object-cover"
                src={
                  profileUser.image ? "https://picsum.photos/id/83/300/320" : profileUser.image
                }
                alt="User Profile Image"
              />
            )}

            <div className="ml-5 w-full">

              <div className="text-[18px]">{profileUser?.fullname}</div>
              {
                showEditButton && (
                  <button
                    onClick={setIsEditOverlayOpen}
                    className="flex item-center rounded-md py-1.5 px-3.5 mt-3 text-[15px] font-semibold border hover:bg-gray-100"
                  >
                    <BsFillPencilFill size="18" className="mt-0.5 mr-1" />
                    <div>Edit Profile</div>
                  </button>
                )
              }

            </div>



          </div>

          <div className="pt-5 mr-4 text-gray-500 font-light text-[15px] pl-1.5 max-w-[500px]">
            {profileUser?.bio}
          </div>

          <div className="mt-4 grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
            {data?.getPostsByUser.map((post: any) => (
              <UserPost key={post.id} post={post} />
            ))}
          </div>
        </div>
      </MainLayout>


    </MainLayout>
  )
}

export default Profile