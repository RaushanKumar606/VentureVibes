
import { createContext, useContext, useEffect, useState } from "react";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUserData] = useState("");
 
 

// DARK MODE
const [darkMode, setDarkMode] = useState(
  localStorage.getItem("darkMode") === "true"
);

useEffect(() => {
  localStorage.setItem("darkMode", darkMode);
  if (darkMode) {
    document.body.classList.toggle("dark", darkMode);
  }
}, [darkMode]);

  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
  };
  const userAuthentication = async () => {
    if (!token) return;
    try {
      const response = await fetch("http://localhost:8080/api/user", {
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
        LogoutUser();
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
  }, [token]); 

  const isLoggedIn = !!token;
  const LogoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUserData(null); 
  };
 

  // ALL BOOKING DETIELS FETCH ED FROM API
  const [allBooking, setBooking] = useState({ booking: 0 });
  const getAllBooking = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/total-bookings",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setBooking(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
        
  useEffect(() => {
    getAllBooking()
  },[])
  return (
    <AuthContext.Provider
      value={{
        storeTokenInLS,
        user,
        token,
        LogoutUser,
        isLoggedIn, 
        allBooking,
        darkMode, setDarkMode
      }}
    >
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
