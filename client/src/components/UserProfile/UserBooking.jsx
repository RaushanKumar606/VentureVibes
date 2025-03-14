import { useState } from "react";
// import { useAuth } from "../Hooks/ContextApi";
const bookingsData = [
  {
    id: 1,
    type: "Hotel",
    name: "Hyatt Regency",
    date: "2025-03-12",
    from: "Adi",
    to: "Bihar",
    status: "Confirmed",
  },
  {
    id: 2,
    type: "Flight",
    name: "AI-203 (Indigo)",
    date: "2025-03-15",
    from: "New York",
    to: "London",
    status: "Pending",
  },
  {
    id: 3,
    type: "Bus",
    name: "Greyhound",
    date: "2025-03-18",
    from: "Los Angeles",
    to: "San Francisco",
    status: "Confirmed",
  },
  {
    id: 4,
    type: "Hotel",
    name: "Taj Hotel",
    date: "2025-03-20",
    from: "Arrfg",
    to: "gsrsdv",
    status: "Canceled",
  },
];

const UserBooking = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // const auth = useAuth();
  // const { bookings, user } = auth || {};
  // console.log(bookings);
  // console.log(bookings[0]?.bus.departureLocation || "No bus booked");
  // console.log(bookings[0]?.bus.busType || "No bus booked");
  // console.log(bookings[0]?.bus.arrivalLocation || "No bus booked");
  // console.log(bookings[0]?.user || "user id");
  // console.log(bookings[0]?.bus.seatsAvailable || "No bus booked");

  const filteredBookings = bookingsData.filter(
    (booking) =>
      (filter === "All" || booking.type === filter) &&
      // booking.user === user._id &&
      booking.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">User Dashboard Bookings</h2>
      <div className="flex justify-between mb-4">
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
      </div>
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
          {filteredBookings.map((booking) => (
            <tr key={booking.id} className="text-center">
              <td className="border p-2">{booking.id}</td>
              <td className="border p-2">{booking.type}</td>
              <td className="border p-2">{booking.name || "N/A"}</td>
              <td className="border p-2">{booking.date || "N/A"}</td>
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
