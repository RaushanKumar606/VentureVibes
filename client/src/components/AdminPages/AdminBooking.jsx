// import { useState } from "react";
import { useAuth } from "../Hooks/ContextApi";
import { useEffect, useState } from "react";
const AdminBooking = () => {
  const [bookings, setBookings] = useState();
  const { token } = useAuth();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
 
  const getBooking = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/users-bookings`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBooking();
  }, []);


  // const filteredBookings = bookings.filter((booking) => {
  //   const matchesSearch =
  //     booking.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
  //     booking.bookingType?.toLowerCase().includes(search.toLowerCase());

  //   const matchesFilter = filter === "All" || booking.bookingType === filter;

  //   return matchesSearch && matchesFilter;
  // });





  const formatData = (isoData) => {
    return new Date(isoData).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      // hour: "2-digit",
      // // second:"2-digit",
      // timeZoneName: "short",
    });
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">
        Admin Dashboard - Booking Management
      </h2>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by user or booking name..."
          className="p-2 border rounded w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select className="p-2 border rounded" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Hotel">Hotel</option>
          <option value="Flight">Flight</option>
          <option value="Bus">Bus</option>
        </select>
      </div>


      {/* Bookings Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Booking ID</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">User Name</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">From</th>
            <th className="border p-2">To</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
  {bookings && bookings.length > 0 ? (
    bookings.map((booking) => (
      <tr key={booking._id} className="text-center">
        <td className="border p-2">{booking._id}</td>
        <td className="border p-2">{booking.bookingType}</td>
        <td className="border p-2">{booking.user?.name || "N/A"}</td>
        <td className="border p-2">{formatData(booking.updatedAt)}</td>
        <td className="border p-2">{booking.from || "N/A"}</td>
        <td className="border p-2">{booking.to || "N/A"}</td>
        <td
          className={`border p-2 font-bold ${
            booking.status === "Confirmed"
              ? "text-green-500"
              : booking.status === "Pending"
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >
          {booking.status}
        </td>
        <td className="border p-2 flex justify-center space-x-2">
          <select className="border p-1 rounded">
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Canceled">Canceled</option>
          </select>
          <button className="bg-red-500 text-white px-3 py-1 rounded">
            Delete
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="8" className="text-center p-4">
        No bookings available.
      </td>
    </tr>
  )}
</tbody>

      </table>
    
    </div>
  );
};

export default AdminBooking;
