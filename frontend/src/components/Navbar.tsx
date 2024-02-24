import React from 'react'
import { Link } from 'react-router-dom'
import {
    AiOutlineSearch,
    AiOutlineUpload,
} from "react-icons/ai"
import { BsThreeDotsVertical, BsFillPersonFill, BsHouse } from "react-icons/bs"
import { RiLogoutBoxRLine } from "react-icons/ri";
import useGeneralStore from "../stores/generalStore"
import { useUserStore } from "../stores/userStore"
import { LOGOUT_USER } from "../graphql/mutations/logoutMutation"
import { useMutation } from "@apollo/client"
import { useLocation } from "react-router-dom"
import { LogoutUserMutation } from '../gql/graphql'
import Logo from './Logo';
import { toast } from 'react-toastify';
function Navbar() {
    const isLoginOpen = useGeneralStore((state) => state.isLoginOpen)
    const setIsLoginOpen = useGeneralStore((state) => state.setLoginIsOpen)
    const user = useUserStore((state) => state)
    const setUser = useUserStore((state) => state.setUser)
    const [logoutUser] = useMutation<LogoutUserMutation>(LOGOUT_USER)
    const location = useLocation()
    const [showMenu, setShowMenu] = React.useState(false)
    const getURL = () => {
        return window.location.pathname
    }


    const handleLogout = async () => {
        try {
            await logoutUser();
            setUser({
                id: undefined,
                fullname: '',
                email: '',
                bio: '',
                image: ''
            });
            setIsLoginOpen(true);
            toast.success("Logged out successfully");
        } catch (error) {
            console.log(error);
            // Show error toast message
            toast.error("An error occurred while logging out");
        }
    };

    return (
        <div id='NavBar' className='bg-white fixed z-30 flex items-center w-full border-b h-[50px]'>
            <div className="max-w-[1150px] flex items-center justify-between w-full px-2 mx-auto">
                <div className="w-[80%]">
                      <Logo /> 
                </div>

                <div className="hidden md:flex items-center bg-white p-0 rounded-full w-full md:w-auto border border-gray-300 focus:outline-[#a855f7]">
                    <input
                        type="text"
                        className="flex-grow pl-3 my-2 bg-transparent placeholder-[#838383] text-[15px] focus:outline-none"
                        placeholder="Search Users"
                    />
                    <div className="px-3 py-1 flex items-center">
                        <AiOutlineSearch size="20" className="text-[#838383] focus-within:text-[#a855f7]" />
                    </div>
                </div>
                <div className="flex min-w-[50px] max-w-[320px]">

                    <div>
                        {location.pathname === "/" ? (
                            <Link to="/upload" className="flex items-center px-3 py-[6px]" >
                                <AiOutlineUpload size="20" className="hover:text-[#a855f7] text-[#838383]" title="Upload" />
                            </Link>
                        ) : (
                            <Link to="/" className="flex items-center px-3 py-[6px]">
                                <BsHouse size="20" className="hover:text-[#a855f7] text-[#838383]" title="Feed" />
                            </Link>
                        )}
                    </div>
                    {!user.id && (
                        <div className="flex items-center">
                            <button
                                onClick={() => setIsLoginOpen(!isLoginOpen)}
                                className="flex items-center bg-white hover:text-[#a855f7] text-[#838383] px-3 py-[6px] min-w-[110px]"
                            >
                                <span className="mx-4 font-medium text-[15px]">Log In</span>
                            </button>
                            <BsThreeDotsVertical size="20" color="#161724" />
                        </div>
                    )}
                    {user.id && (
                        <div className="relative">
                            <div className="flex items-center px-3 py-[6px]">
                                <button className="flex items-center" onClick={() => setShowMenu(!showMenu)}>
                                     <img
                                        className={[
                                            "border-2 rounded-full object-cover max-w-[20px]",
                                            "hover:border-[#a855f7] focus:border-[#a855f7]",
                                            showMenu ? "border-[#a855f7]" : "border-[#838383]",
                                        ].join(" ")}
                                        src={
                                            !user.image
                                                ? "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg"
                                                : user.image
                                        }
                                        alt="User Profile"
                                    />
                                </button>
                            </div>
                            {showMenu && (
                                <div id="Menu" className="absolute shadow-md bg-white rounded-lg py-1.5 w-[60px] lg:w-[125px] border top-full mt-[5px] left-1/2 transform -translate-x-1/2">
                                    <div className="outer-triangle absolute top-[-25px] left-1/2 transform -translate-x-1/2">
                                        <div className="inner-triangle absolute top-[-7px] left-1/2 transform -translate-x-1/2">
                                        </div>
                                    </div>
                                    <div className='hover:text-[#a855f7] text-sm text-[#838383]'>
                                        <Link
                                            onClick={() => setShowMenu(!showMenu)}
                                            to={"/profile/" + user.id}
                                            className="flex items-center px-4 py-2 "
                                        >
                                            <BsFillPersonFill size="20" className="mr-2" title="Profile" />
                                            <span className=" hidden lg:inline">My Profile</span>
                                        </Link>
                                    </div>

                                     <div
                                        onClick={handleLogout}
                                        className="flex items-center px-4 py-2 text-sm text-[#838383] cursor-pointer hover:text-[#a855f7]"
                                    >
                                        <RiLogoutBoxRLine
                                            size="20"
                                            className="mr-2"
                                            title="Log Out"
                                        />
                                        <span className="hidden lg:inline">Log out</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar