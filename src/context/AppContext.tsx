import React, { useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as UserApi from "../api/UserApi";

type ToastMessage = {
    message: string,
    type: "SUCCESS" | "ERROR"
}

type AppContext = {
    showToast: (toastMessage:ToastMessage)=>void;
    isLoggedIn: boolean
}

const AppContext = React.createContext<AppContext | undefined>(undefined)

export const AppContextProvider = ({children}:{children: React.ReactNode})=>{
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined)
    const {isError} = useQuery("validateToken", UserApi.validateToken,{
        retry:false
    })
    return(
        <AppContext.Provider
         value={{showToast: (toastMessage)=> setToast(toastMessage),
            isLoggedIn:!isError,
         }}>
            {toast && <Toast message={toast.message} type={toast.type} onClose={()=>setToast(undefined)}/>}
            {children}
        </AppContext.Provider>
    )

}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = ()=>{
    const context = React.useContext(AppContext)
    
    return context as AppContext
}