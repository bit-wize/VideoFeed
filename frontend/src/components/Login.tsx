import React from "react"
import Input from "./Input"
import { LOGIN_USER } from "../graphql/mutations/loginMutation"
import { useMutation } from "@apollo/client"
import { useUserStore } from "../stores/userStore"
import { GraphQLErrorExtensions } from "graphql"
import useGeneralStore from "../stores/generalStore"
import { LoginUserMutation } from "../gql/graphql"
import { toast } from "react-toastify"
function Login() {
  const [loginUser] = useMutation<LoginUserMutation>(LOGIN_USER)
  const setUser = useUserStore((state) => state.setUser)
  const setIsLoginOpen = useGeneralStore((state) => state.setLoginIsOpen)
  const [errors, setErrors] = React.useState<GraphQLErrorExtensions>({})
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  })

  const handleLogin = async () => {
    setErrors({});
    try{

    }catch(error){
      
    }
    const response = await loginUser({
      variables: {
        email: loginData.email,
        password: loginData.password
      }
    }).catch((error) => {
      console.error(error);
      console.error(error?.graphQLErrors[0]?.extensions); 
      setErrors(error);
    });
  
    if (response && response.data && response.data.login && response.data.login.user) {
      setUser(response.data.login.user);
      setIsLoginOpen(false);
      toast.success("Login successful");
    } else {
      console.error('Login response or user data is undefined or null');
      toast.error("Login failed");
    }
  }

  return (
    <>
      <div className="text-center text-[#a855f7] text-[28px] mb-4 ">Login</div>
      <div className="px-6 pb-2">
        <Input
          title="Email"
          max={64}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
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
            setLoginData({ ...loginData, password: e.target.value })
          }
          placeHolder="Password"
          inputType="password"
          error={errors.message}
        />
      </div>
      <div className="px-6 mt-6">
        <button
          onClick={handleLogin}
          disabled={
            !loginData.email ||
            !loginData.password
          }
          className={[
            "w-full text-[17px]  text-white py-3 rounded-lg",
            !loginData.email ||
              !loginData.password
              ? "bg-gray-200"
              : "bg-[#a855f7] hover:bg-[#7e22ce]",
          ].join(" ")}
        >
          Login
        </button>
      </div>
    </>
  )
}

export default Login