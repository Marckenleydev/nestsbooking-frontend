import {useForm} from "react-hook-form"
import { RegisterFormData } from "../types";
import { useMutation, useQueryClient } from "react-query";
import * as UserApi from "../api/UserApi";
import { useAppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router";

const  SignIn=()=> {
  const {showToast}= useAppContext();
  const navigate = useNavigate();
    const queryClient = useQueryClient()

  const mutation = useMutation(UserApi.userLogin,{
    onSuccess: async() => {
      showToast({message: "LogIn successfully", type: "SUCCESS"})
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
   
    
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  })
  const {register,  handleSubmit, formState:{errors}} = useForm<RegisterFormData>();

  const onSubmit = handleSubmit((data)=>{
    mutation.mutate(data);

  })
  return (
    <form className="flex flex-col gap-5 " onSubmit={onSubmit}>
        <h2 className="text-3xl font-semibold">Sign In</h2>

        <div className="flex flex-col md:flex-row gap-5">
        
          
        </div>
        <label htmlFor="" className="text-gray-700 text-sm font-bold flex flex-col flex-1" >
            Email
            <input type="email" className="border rounded w-full py-1 px-2 font-normal" {...register("email",{required:"Email is required"})} />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </label>


          <label htmlFor="" className="text-gray-700 text-sm font-bold flex flex-col flex-1" >
            Password
            <input type="password" className="border rounded w-full py-1 px-2 font-normal" {...register("password",{required:"password is required",minLength:{value:6, message:"Password must at least 6 caractere"}})} />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </label>

        
          <span className="flex items-center justify-between">
            <span className="text-sm">Not Registered <Link className="underline text-blue-700" to="/register">Create an account here</Link> </span>
            <button type="submit" className="bg-blue-800 cursor-pointer py-2 px-6 text-white font-semibold hover:bg-blue-700">Log In</button></span>


    </form>
  )
}

export default SignIn