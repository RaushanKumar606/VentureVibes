import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../Hooks/ContextApi/ContextApi";
import {  toast } from 'react-toastify';
const Logout=()=> {
    const {LogoutUser}=useAuth();
    useEffect(()=>{
        LogoutUser()
    },[LogoutUser])
toast.success("Login Successful");
  return <Navigate to='/login'/>;
}

export default Logout
