import { useAuth } from "../Hooks/ContextApi/ContextApi";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
const AdminFlight = () => {
  const [flights, setFlights] = useState([]);
  const { token } = useAuth();

  // Fetch flights from API
  const fetchFlights = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/admin/flights", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const flightData = await response.json();
        setFlights(flightData);
      }
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  const deleteUserById = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/flight/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        fetchFlights();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  return (
    <div className="overflow-x-auto p-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 mt-5">
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search flights"
            className="w-full p-2 pl-10 border rounded-md"
          />
          <FiSearch className="absolute left-3 top-3 text-gray-500" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 md:gap-6">
        <button className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-lg border border-gray-300 shadow-md bg-">
            <Link to={`/admin/create-flight`}>+AddFlight</Link>
            
          </button>
          <button className="text-black px-4 py-2 rounded-lg border border-gray-300 shadow-md">
            View Table
          </button>
          <button className="text-black px-4 py-2 rounded-lg border border-gray-300 shadow-md">
            Filter
          </button>
          <button className="text-black px-4 py-2 rounded-lg border border-gray-300 shadow-md">
            Export
          </button>
        </div>
      </div>

      {/* Flight Table */}
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-3 px-6 text-left">Airline</th>
            <th className="py-3 px-6 text-left">Flight No.</th>
            <th className="py-3 px-6 text-left">Departure</th>
            <th className="py-3 px-6 text-left">Arrival</th>
            <th className="py-3 px-6 text-left">Price</th>
            <th className="py-3 px-6 text-left">Seats</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left">Edit</th>
            <th className="py-3 px-6 text-left">Delete</th>
          </tr>
        </thead>
        <tbody>
          {flights.length > 0 ? (
            flights.map((flight, index) => (
              <tr key={index} className="border-b hover:bg-gray-100 transition duration-300">
                {/* Airline Name */}
                <td className="py-3 px-6 flex items-center">
                  <img
                    src={flight.airline?.logoUrl || "https://via.placeholder.com/50"}
                    alt={flight.airline?.name || "No Image"}
                    className="w-10 h-10 object-cover rounded-lg mr-2"
                  />
                  {flight.airline?.name}
                </td>
                <td className="py-3 px-6">{flight.flightNumber}</td>
                <td className="py-3 px-6">{flight.departureTime?.start}</td>
                <td className="py-3 px-6">{flight.arrivalTime?.start}</td>
                <td className="py-3 px-6">${flight.minPrice?.amount}</td>
                <td className="py-3 px-6">{flight.seatsAvailable}</td>
                <td className={`py-3 px-6 font-semibold ${
                  flight.status === "Scheduled" ? "text-green-500" :
                  flight.status === "Delayed" ? "text-yellow-500" :
                  "text-red-500"
                }`}>
                  {flight.status}
                </td>
                <td className="py-3 px-6"> <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition">
                    <Link to={`/admin/hotel/${flight._id}/edit`}>Edit</Link>
                  </button></td>
                <td className="py-3 px-6">
                  <button
                    onClick={() => deleteUserById(flight._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="py-3 px-6 text-center">
                No flights available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminFlight;
