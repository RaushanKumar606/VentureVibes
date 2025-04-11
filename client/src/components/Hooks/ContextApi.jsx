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
  //user data
  const userAuthentication = async () => {
    if (!token) return;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/user`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const userData = await response.json();
        setUserData(userData);
      } else if (response.status === 401) {
        console.error("Token is invalid or expired. Logging out...");
        LogoutUser();
      } else {
        // console.error("Failed to authenticate user");
      }
    } catch (error) {
      // console.error("Error during user authentication:", error);
    }
  };

  // USER REVIEW
  const [userReviewData, setUserReviewData] = useState();
  const userReview = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/review`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const userData = await response.json();
        setUserReviewData(userData);
      }
    } catch (error) {
      alert(error);
    }
  };

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
        `${import.meta.env.VITE_BASE_URL}/api/admin/total-bookings`,
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
      // console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (token) {
      userAuthentication();
    }
    getAllBooking(), userReview();
  }, [token]);
  return (
    <AuthContext.Provider
      value={{
        storeTokenInLS,
        user,
        token,
        LogoutUser,
        isLoggedIn,
        allBooking,
        darkMode,
        setDarkMode,
        userReviewData,
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
