import { useState, useEffect } from "react";
import { useAuth } from "../Hooks/ContextApi";

const UserBooking = () => {
  // const [search, setSearch] = useState("");
  // const [filter, setFilter] = useState("All");
  const [userBook, setUserBook] = useState([]);
  const { user, token } = useAuth();

  const getBook = async () => {
    if (!user || !token) {
      console.log("No valid user token found!");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/bookings/users/${user._id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setUserBook(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    if (user) {
      getBook();
    } else {
      console.error("User token is missing!");
    }
  }, [user]);

  const formatData = (isoData) => {
    return new Date(isoData).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">User Dashboard Bookings</h2>
      {/* <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="p-2 border rounded w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Hotel">Hotel</option>
          <option value="Flight">Flight</option>
          <option value="Bus">Bus</option>
        </select>
      </div> */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Booking ID</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">From</th>
            <th className="border p-2">To</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {userBook.map((booking) => (
            <tr key={booking._id} className="text-center">
              <td className="border p-2">{booking._id}</td>
              <td className="border p-2">{booking.bookingType}</td>
              <td className="border p-2">{booking.user.name || "N/A"}</td>
              <td className="border p-2">{formatData(booking.updatedAt)}</td>
              <td className="border p-2">{booking.from || "N/A"}</td>
              <td className="border p-2">{booking.to || "N/A"}</td>
              <td className="border p-2">{booking.status}</td>

              <td className="border p-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                  View
                </button>
                {booking.paymentStatus !== "Canceled" && (
                  <button className="bg-red-500 text-white px-3 py-1 rounded">
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserBooking;
