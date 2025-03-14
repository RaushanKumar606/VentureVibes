
import { createContext, useContext, useEffect, useState } from "react";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUserData] = useState("");
  // const [loading, setLoading] = useState(false); 
   // const { user, token } = useAuth;
 
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
  // Booking Api 
  const[bookings,setBookings]=useState([])
  const userId = user.userData?.id || user.userData?._id || null;
  useEffect(() => {
    const fetchBookings = async () => {
      if (!userId || !token) return;
      try {
        const response = await fetch(
          `http://localhost:8080/api/bookings/user/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch bookings");
        const data = await response.json();
        setBookings(data);
        console.log("books",data)
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    // console.log('bookfetch',fetchBookings())
    if (userId && token) fetchBookings();
  }, [userId, token]);



  return (
    <AuthContext.Provider
      value={{
        storeTokenInLS,
        user,
        token,
        LogoutUser,
        isLoggedIn, 
        bookings
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
