

import { createContext, useContext, useEffect, useState } from "react";
import { fetchData } from "../../../../utils/rapid.api";
export const AuthContext = createContext();
// Define the provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUserData] = useState(null);
  const [loading,setLoading]=useState([]);
  const [data,setData]= useState(["New"]);
  const [value,setValue]= useState(["New"]);

  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken); // Update state when token is stored
  };

  // Api call for hotel train flight and bus
 const featchAllData = (query)=>{
  setLoading(true);
  fetchData(`search/?q=${query}`).then((res)=>{
  setData(res)
  setLoading(false);
})

 }



  const userAuthentication = async () => {
    if (!token) 
      return; 

    try {
      const response = await fetch(`http://localhost:8080/api/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUserData(userData);
      } else if (response.status === 401) {
        console.error("Token is invalid or expired. Logging out...");
        localStorage.removeItem("token");
        setToken(null);
        setUserData(null);
      } else {
        console.error("Failed to authenticate user");
      }
    } catch (error) {
      console.error("Error during user authentication:", error);
    }
  };
  useEffect(() => {
    if (token) {
      userAuthentication();
    }
    featchAllData(value)
  }, [value]);

  // userLogout logic
let isLoggedIn = !!token

  const LogoutUser=()=>{
    setToken("");
    return localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ storeTokenInLS,user ,token ,LogoutUser,isLoggedIn,data,loading,setValue }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the context
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);

  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return authContextValue;
};
