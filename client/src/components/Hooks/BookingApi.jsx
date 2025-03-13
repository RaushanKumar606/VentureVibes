import { useState, useContext, createContext, useEffect } from "react";
import { useAuth } from "./ContextApi";
const BookingContext = createContext();
const BookingProvider = ({ children,token,userId }) => {
  const [bookings, setBookings] = useState([]);
  // const { user, token } = useAuth;
  // const userId = user ? user.id || user._id : null;

  useEffect(() => {
    const fetchBookings = async () => {
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
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    // console.log('bookfetch',fetchBookings())
    if (userId && token) fetchBookings();
  }, [userId, token]);
   


  //1. Create Booking
  const createBooking = async (bookingData) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/bookings/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );
      if (!response.ok) throw new Error("Failed to create booking");
      const newBooking = await response.json();
      setBookings([...bookings, newBooking]);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };
  // ✅ 2. Cancel Booking
  const cancelBooking = async (bookingId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api//bookings/cancel/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to cancel booking");
      setBookings(bookings.filter((b) => b.id !== bookingId));
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  // ✅ 3. Update Payment Status
  const updatePaymentStatus = async (paymentData) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/bookings/paymentStatus`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        }
      );
      if (!response.ok) throw new Error("Failed to update payment status");
      setBookings(
        bookings.map((b) =>
          b.id === paymentData.id
            ? { ...b, paymentStatus: paymentData.status }
            : b
        )
      );
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  return (
    <BookingContext.Provider
      value={{ bookings, createBooking, cancelBooking, updatePaymentStatus }}
    >
      {children}
    </BookingContext.Provider>
  );
};

// Custom Hook
const useBooking = () => useContext(BookingContext);

export { useBooking, BookingProvider };
