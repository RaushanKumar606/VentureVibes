import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../Hooks/ContextApi/ContextApi";

const Logout=()=> {
    const {LogoutUser}=useAuth();
    useEffect(()=>{
        LogoutUser()
    },[LogoutUser])

  return <Navigate to='/logout'/>;
}

export default Logout
