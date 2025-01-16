import { RegisterFormData, SignInFormData } from "../types";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const userRegister = async(formData:RegisterFormData)=>{
    
    const response = await fetch(`${API_BASE_URL}/api/users/register`,{
        method: "POST",
        credentials:"include",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(formData)
    })

   
    const responseBody = await response.json();

    if(!response.ok){
        throw new Error(responseBody.message)
    }

    return responseBody
}
export const userLogin = async(formData:SignInFormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/users/login`,{
        method: "POST",
        credentials:"include",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(formData)
    })

    const responseBody = await response.json();

    if(!response.ok){
        throw new Error(responseBody.message)
    }

    return responseBody
}

export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/users/logout`, {
      credentials: "include",
      method: "POST",
    });
  
    if (!response.ok) {
      throw new Error("Error during sign out");
    }
  };

export const validateToken=async()=>{
    const response = await fetch(`${API_BASE_URL}/api/users/validate-token`,{
        method: "POST",
        credentials:"include",
    })

    if(!response.ok){
        throw new Error("Token is not valid")
    }

    return response.json();

}