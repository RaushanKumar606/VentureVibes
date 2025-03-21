import { useAuth } from "../Hooks/ContextApi";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
const AdminBus = () => {
  const [buses, setBuses] = useState([]);
  const { token } = useAuth();

  // const [search, setSearch] = useState("");

  // const filteredBus = buses.filter(
  //   (buse) => buses.name.toLowerCase().includes(search.toLowerCase()) ||
  //   buse.location.toLowerCase().includes(search.toLowerCase())
  // );


  // Fetch buses from API
  const fetchBuses = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/admin/buses", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const busData = await response.json();
        setBuses(busData);
      }
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  const deleteUserById = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/bus/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        fetchBuses();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  return (
    <div className="overflow-x-auto p-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 mt-5">
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search buses"
            className="w-full p-2 pl-10 border rounded-md"
            onChange={(e) => setSearch(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-3 text-gray-500" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 md:gap-6">
          <button className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-lg border border-gray-300 shadow-md bg-">
            <Link to={`/admin/create-bus`}>+AddBus</Link>
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

      {/* Bus Table */}
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-3 px-6 text-center">Image</th>
            <th className="py-3 px-6 text-center">Name</th>
            <th className="py-3 px-6 text-center">Operator</th>
            <th className="py-3 px-6 text-center">From</th>
            <th className="py-3 px-6 text-center"> To</th>
            <th className="py-3 px-6  text-center"> Price</th>
            <th className="py-3 px-6  text-center"> TotalSeast</th>
            <th className="py-3 px-6  text-center">AvilableSeat </th>
            <th className="py-3 px-6  text-center">Status</th>
            <th className="py-3 px-6  text-center">Action</th>
         
          </tr>
        </thead>
        <tbody>
          {buses.length > 0 ? (
            buses.map((bus, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-100 transition duration-300"
              >
                {/* Bus Image with Fallback */}
                <td className="py-3 px-6">
                  <img
                    src={
                      bus.images?.[0]?.url || "https://via.placeholder.com/100"
                    }
                    alt={bus.name || "No Image"}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </td>
                <td className="py-3 px-6">{bus.name}</td>
                <td className="py-3 px-6">{bus.operator}</td>
                <td className="py-3 px-6">{bus.departureLocation}</td>
                <td className="py-3 px-6">{bus.arrivalLocation}</td>
                <td className="py-3 px-6">${bus.price?.amount}</td>
                <td className="py-3 px-6">{bus.totalSeat}</td>
                <td className="py-3 px-6">{bus.seatsAvailable}</td>
                <td
                  className={`py-3 px-6 font-semibold ${
                    bus.status === "Scheduled"
                      ? "text-green-500"
                      : bus.status === "Delayed"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {bus.status}
                </td>
                <td className="py-3 px-6 ">
                <div className="flex gap-2">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition">
                    <Link to={`/admin/bus/${bus._id}/update`}>Edit</Link>
                  </button>
                  <button
                    onClick={() => deleteUserById(bus._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                  >
                    Delete
                  </button>
                  </div>
                </td>
               
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="py-3 px-6 text-center">
                No buses available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBus;
