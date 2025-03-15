import { useState } from "react";
import { useAuth } from "../Hooks/ContextApi";
const initialBookings = [
  { id: 1, user: "Rahul Verma", type: "Hotel", name: "Hyatt Regency", date: "2025-03-12", from: "-", to: "-", status: "Confirmed" },
  { id: 2, user: "Anjali Sharma", type: "Flight", name: "AI-203 (Indigo)", date: "2025-03-15", from: "New York", to: "London", status: "Pending" },
  { id: 3, user: "Rohan Mehta", type: "Bus", name: "Greyhound", date: "2025-03-18", from: "Los Angeles", to: "San Francisco", status: "Confirmed" },
  { id: 4, user: "Priya Gupta", type: "Hotel", name: "Taj Hotel", date: "2025-03-20", from: "-", to: "-", status: "Canceled" },
];

const AdminBooking = () => {
  const [booking, setBookings] = useState(initialBookings);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const { bookings} = useAuth();
  // Update booking status
  const updateStatus = (id, newStatus) => {
    const updatedBookings = booking.map((booking) =>
      booking.id === id ? { ...booking, status: newStatus } : booking
    );
    setBookings(updatedBookings);
  };

  // Delete booking
  const deleteBooking = (id) => {
    const updatedBookings = booking.filter((booking) => booking.id !== id);
    setBookings(updatedBookings);
  };

  // const filteredBookings = bookings.filter(
  //   (booking) =>
  //     (filter === "All" || booking.type === filter) &&
  //     booking.name.toLowerCase().includes(search.toLowerCase())
  // );

    const formatData = (isoData)=>{
      return new
      Date(isoData).toLocaleString("en-US",{
        year: "numeric",
        month: "long",
        day: "numeric",
        hour:"2-digit",
        // second:"2-digit",
        timeZoneName:"short"
        
      })
    }
    const shortId =(_id,lenght=8)=>{
      return _id.lenght>lenght ?
      _id.subsstring(0,lenght)+ "...":
      _id;
    }  ;

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard - Booking Management</h2>

      {/* Search & Filter */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by user or booking name..."
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
      </div>

      {/* Table */}
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
          {bookings.map((booking) => (
            <tr key={booking.id} className="text-center">
              <td className="border p-2">{shortId(booking._id)}</td>
              <td className="border p-2">{booking.bookingType}</td>
              <td className="border p-2">{booking.user.name || "N/A"}</td>
              <td className="border p-2">{formatData(booking.updatedAt)}</td>
              <td className="border p-2">{booking.from || "N/A"}</td>
              <td className="border p-2">{booking.to || "N/A"}</td>
              {/* <td className="border p-2">{booking.status}</td> */}
              <td className={`border p-2 font-bold ${booking.status === "Confirmed" ? "text-green-500" : booking.status === "Pending" ? "text-yellow-500" : "text-red-500"}`}>
                {booking.status}
              </td>
              <td className="border p-2 flex justify-center space-x-2">
                <select
                  className="border p-1 rounded"
                  value={booking.status}
                  onChange={(e) => updateStatus(booking.id, e.target.value)}
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Canceled">Canceled</option>
                </select>
                <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => deleteBooking(booking.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default AdminBooking;
