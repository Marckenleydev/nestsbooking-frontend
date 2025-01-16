import {useForm} from "react-hook-form"
import { RegisterFormData } from "../types";
import { useMutation, useQueryClient } from "react-query";
import * as UserApi from "../api/UserApi";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router";

const  Register=()=> {
  const {showToast}= useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient()

  const mutation = useMutation(UserApi.userRegister,{
    onSuccess: async() => {
      
      showToast({message: "User registered successfully", type: "SUCCESS"})
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  })
  const {register, watch, handleSubmit, formState:{errors}} = useForm<RegisterFormData>();

  const onSubmit = handleSubmit((data)=>{
    mutation.mutate(data);

  })
  return (
    <form className="flex flex-col gap-5 " onSubmit={onSubmit}>
        <h2 className="text-3xl font-semibold">Create an Account</h2>

        <div className="flex flex-col md:flex-row gap-5">
          <label htmlFor="" className="text-gray-700 text-sm font-bold flex flex-col flex-1">
            First Name
            <input type="text" className="border rounded w-full py-1 px-2 font-normal" {...register("firstName",{required:"First Name is required"})} />
            {errors.firstName && (
              <span className="text-red-500">{errors.firstName.message}</span>
            )}

          </label>

          <label htmlFor="" className="text-gray-700 text-sm font-bold flex flex-col flex-1" >
            Last Name
            <input type="text" className="border rounded w-full py-1 px-2 font-normal" {...register("lastName",{required:"Last Name is required"})} />
            {errors.lastName && (
              <span className="text-red-500">{errors.lastName.message}</span>
            )}
          </label>

          
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


          <label htmlFor="" className="text-gray-700 text-sm font-bold flex flex-col flex-1" >
           Confirm Password
            <input type="password" className="border rounded w-full py-1 px-2 font-normal" {...register("confirmPassword",{
              validate:(value)=>{
                if(!value){
                  return "Confirm Password is required"

                } 
                  else if(watch("password") !== value){
                    return "Passwords do not match"
                  }
                }
              
            })} />
            {errors.confirmPassword && (
              <span className="text-red-500">{errors.confirmPassword.message}</span>
            )}
          </label>
          <span><button type="submit" className=" bg-blue-800 cursor-pointer py-2 px-6 text-white font-semibold hover:bg-blue-700">Create Account</button></span>


    </form>
  )
}

export default Register