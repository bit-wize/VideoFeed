import React from "react"
import Input from "./Input"
import { REGISTER_USER } from "../graphql/mutations/registerMutation"
import { useMutation } from "@apollo/client"
import { useUserStore } from "../stores/userStore"
import { GraphQLErrorExtensions } from "graphql"
import useGeneralStore from "../stores/generalStore"
import { RegisterUserMutation } from "../gql/graphql"
import { toast } from "react-toastify"
function Register() {
    const [registerUser, { data }] = useMutation<RegisterUserMutation>(REGISTER_USER)
    const setUser = useUserStore((state) => state.setUser)
    const setIsLoginOpen = useGeneralStore((state) => state.setLoginIsOpen)
    const [errors, setErrors] = React.useState<GraphQLErrorExtensions>({})
    const [registerData, setLoginData] = React.useState({
        email: "",
        password: "",
        fullName: "",
        confirmPassword: "",
    })
    const handleRegister = async () => {
        setErrors({})
        await registerUser({
            variables: {
                email: registerData.email,
                password: registerData.password,
                fullname: registerData.fullName,
                confirmPassword: registerData.confirmPassword,
            },
        }).catch((error?) => {
            console.log(error.graphQLErrors)
            setErrors(error.graphQLErrors[0].extensions)
            toast.error("Registeration failed");

        })
        if (data && data.register && data.register.user) {
            toast.success("Registeration successful");
            setUser(data.register.user);
            setIsLoginOpen(false)
        }


    }

    return (
        <>
            <div className="text-center text-[#a855f7] text-[28px] mb-4 ">Register</div>
            <div className="px-6 pb-2">
                <Input
                    title="Full Name"
                    max={64}
                    min={3}
                    placeHolder="Enter your full name"
                    onChange={(e) =>
                        setLoginData({ ...registerData, fullName: e.target.value })
                    }
                    inputType="email"
                    error={errors?.fullname as string}
                />
            </div>
            <div className="px-6 py-2  pb-2">
                <Input
                    title="Email"
                    max={64}
                    onChange={(e) =>
                        setLoginData({ ...registerData, email: e.target.value })
                    }
                    placeHolder="Email"
                    inputType="text"
                    error={errors?.email as string}
                />
            </div>
            <div className="px-6 py-2  pb-2">
                <Input
                    title="Password"
                    min={6}
                    max={64}
                    onChange={(e) =>
                        setLoginData({ ...registerData, password: e.target.value })
                    }
                    placeHolder="Password"
                    inputType="password"
                    error={errors?.password as string}
                />
            </div>
            <div className="px-6 py-2  pb-2">
                <Input
                    title="Confirm Password"
                    max={64}
                    onChange={(e) =>
                        setLoginData({ ...registerData, confirmPassword: e.target.value })
                    }
                    placeHolder="Confirm Password"
                    inputType="password"
                    error={errors?.confirmPassword as string}
                />
            </div>
            <div className="px-6 mt-6">
                <button
                    onClick={handleRegister}
                    disabled={
                        !registerData.email ||
                        !registerData.password ||
                        !registerData.fullName ||
                        !registerData.confirmPassword
                    }
                    className={[
                        "w-full text-[17px]  text-white py-3 rounded-lg",
                        !registerData.email ||
                            !registerData.password ||
                            !registerData.fullName ||
                            !registerData.confirmPassword
                            ? "bg-gray-200"
                            : "bg-[#a855f7] hover:bg-[#7e22ce]",
                    ].join(" ")}
                >
                    Register
                </button>
            </div>
        </>
    )
}

export default Register

