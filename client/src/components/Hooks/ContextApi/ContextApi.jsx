
import { createContext, useContext, useEffect, useState } from "react";
import { busApi, flightApi, hotelApi, trainApi } from "../../utils/ApiAll";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUserData] = useState("");
  const [loading, setLoading] = useState(false); 
  const [flightData, setFlightData] = useState([]);
  const [trainData, setTrainData] = useState([]);
  const [busData, setBusData] = useState([]);
  const [hotelData, setHotelData] = useState([]);
  const [value, setValue] = useState("New"); 

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [flightRes, trainRes, busRes, hotelRes] = await Promise.all([
        flightApi(),
        trainApi(),
        busApi(),
        hotelApi(),
      ]);
      setFlightData(flightRes || []);
      setTrainData(trainRes || []);
      setBusData(busRes || []);
      setHotelData(hotelRes || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [value]); 

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
        console.log("userdata",userData)
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

  return (
    <AuthContext.Provider
      value={{
        storeTokenInLS,
        user,
        token,
        LogoutUser,
        isLoggedIn,
        flightData,
        hotelData,
        busData,
        trainData,
        setValue,
        loading, 
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
