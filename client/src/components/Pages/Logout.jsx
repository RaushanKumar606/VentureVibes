import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../Hooks/ContextApi";
import {  toast } from 'react-toastify';
const Logout=()=> {
 
    const {LogoutUser}=useAuth();
    useEffect(()=>{
        LogoutUser()
    })
    toast.error("Logout User");

  return <Navigate to='/login'/>;
  
}

export default Logout
