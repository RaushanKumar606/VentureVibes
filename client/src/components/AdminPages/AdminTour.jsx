import { useAuth } from "../Hooks/ContextApi";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
const AdminTour = () => {
  const [tours, setTours] = useState([]);
  const { token } = useAuth();
  const fetchTours = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/admin/tours", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const tourData = await response.json();
        setTours(tourData);
      }
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };
  const deleteUserById = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/tours/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        fetchTours();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  return (
    <div className="overflow-x-auto p-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 mt-5">
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search tours"
            className="w-full p-2 pl-10 border rounded-md"
          />
          <FiSearch className="absolute left-3 top-3 text-gray-500" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 md:gap-6">
          <button className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-lg border border-gray-300 shadow-md bg-">
            <Link to={`/admin/create-tour`}>+Add Tour</Link>
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

      {/* Tour Table */}
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-3 px-6 text-left">Image</th>
            <th className="py-3 px-6 text-left">Tour Name</th>
            <th className="py-3 px-6 text-left">Location</th>
            <th className="py-3 px-6 text-left">Price</th>
            <th className="py-3 px-6 text-left">Country</th>
            <th className="py-3 px-6 text-left">Rating</th>
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {tours.length > 0 ? (
            tours.map((tour, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-100 transition duration-300"
              >
                {/* Tour Image */}
                <td className="py-3 px-6">
                  <img
                    src={tour.image?.url || "https://via.placeholder.com/100"}
                    alt={tour.name || "No Image"}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </td>
                <td className="py-3 px-6">{tour.title}</td>
                <td className="py-3 px-6">{tour.location}</td>
                <td className="py-3 px-6">${tour.price}</td>
                <td className="py-3 px-6">{tour.country} </td>
                <td className="py-3 px-6">{tour.review} ⭐</td>
                <td className="py-3 px-6">
                  {new Date(tour.createdAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td className="py-3 px-6">
                  <div className="flex gap-2">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition">
                      <Link to={`/admin/tour/${tour._id}/edit`}>Edit</Link>
                    </button>
                    <button
                      onClick={() => deleteUserById(tour._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="py-3 px-6 text-center">
                No tours available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTour;
