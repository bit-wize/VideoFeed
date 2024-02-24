import React from 'react'
import useGeneralStore from '../stores/generalStore'
import { ImCross } from 'react-icons/im';
import Login from './Login';
import Register from './Register';


function AuthModal() {
    const [isRegistered, setIsRegistered] = React.useState(false)
    const setLoginIsOpen = useGeneralStore((state) => state.setLoginIsOpen)
    const isLoginOpen = useGeneralStore((state) => state.isLoginOpen)
    return (
        <div id='AuthModal' className="fixed flex items-center justify-center z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50">
            <div className={`relative bg-white w-full max-w-[470px] p-4 rounded-lg shadow-md ${isRegistered ? 'h-[60%]' : 'h-[80%]'}`}>
                <div className="w-full flex justify-end">
                    <button
                        onClick={() => setLoginIsOpen(!isLoginOpen)}
                        className="bg-white"
                    >
                        <ImCross className="hover:text-[#a855f7]" size="10" />
                    </button>
                </div>
                {isRegistered ? <Login /> : <Register />}
                <div className="absolute flex items-center justify-center py-5 left-0 bottom-0 border-t w-full">
                    <span className="text-[14px] text-gray-600">
                        {isRegistered ? `Don't have an account?` : `Already have an account?`}
                    </span>
                    <button
                        onClick={() => setIsRegistered(!isRegistered)}
                        className="text-[14px] text-[#a855f7] font-semibold pl-1 hover:underline"
                    >
                        {isRegistered ? `Register` : `Log In`}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default AuthModal