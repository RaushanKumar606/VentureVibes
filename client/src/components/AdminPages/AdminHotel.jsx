import { useAuth } from "../Hooks/ContextApi";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
const AdminHotel = () => {
  const [hotel, setHotel] = useState([]); // Initialize as an empty array
  const { token } = useAuth();
  const [search, setSearch] = useState("");
  // const [filter, setFilter] = useState("All");

  const filteredHotels = hotel.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(search.toLowerCase()) ||
      hotel.location.toLowerCase().includes(search.toLowerCase())
  );

  // const filteredHotels = hotel.filter(
  //   (hotel) =>
  //     (filter === "All" || hotel.type === filter) &&
  //     hotel.name.toLowerCase().includes(search.toLowerCase())
  // );

  const fetchHotel = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/hotels`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const hotelData = await response.json();
        setHotel(hotelData);
        console.log(hotelData);
      }
    } catch (error) {
      console.log(error); // Fixed typo from `console.lpg`
    }
  };

  const deleteUserById = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/admin/hotel/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        fetchHotel();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHotel();
  }, []); // Added dependency array to prevent infinite loop

  return (
    <div className="overflow-x-auto">
      {/* Search and Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 mt-10">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search something"
            className="w-full p-2 pl-10 border rounded-md"
            onChange={(e) => setSearch(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-3 text-gray-500" />
        </div>

        <div className="flex flex-wrap gap-3 md:gap-6">
          <button className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-lg border border-gray-300 shadow-md bg-">
            <Link to={`/admin/create-hotel`}>+AddHotel</Link>
          </button>
          <button className="text-black px-4 py-2 rounded-lg border border-gray-300 shadow-md">
            View Table
          </button>
          <button className="text-black px-4 py-2 rounded-lg border border-gray-300 shadow-md">
            Filter
            {/* <select
          className="p-2 border rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="name">Name</option>
          <option value="Flight">Flight</option>
          <option value="Bus">Bus</option>
        </select> */}
          </button>
          <button className="text-black px-4 py-2 rounded-lg border border-gray-300 shadow-md">
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full bg-white shadow-md rounded-lg mt-5">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-3 px-6 text-left">Image</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Type Room</th>
            <th className="py-3 px-6 text-left">Night Price</th>
            <th className="py-3 px-6 text-left">Location</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left"> Rooms Available</th>
            <th className="py-3 px-6 text-left">Review</th>
            <th className="py-3 px-6 text-left text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {hotel.length > 0 ? (
            filteredHotels.map((hotel, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-100 transition duration-300"
              >
                <td className="py-3 px-6">
                  <img
                    src={
                      hotel.images?.length > 0
                        ? hotel.images[0] // Access the first image in the array
                        : "https://via.placeholder.com/100"
                    }
                    alt={  "No Image"}
                    className="w-14 h-14 rounded-full border"
                  />
                </td>
                <td className="py-3 px-6">{hotel.name}</td>
                <td className="py-3 px-6">{hotel.typeRoom}</td>
                <td className="py-3 px-6">${hotel.pricePerNight}</td>
                <td className="py-3 px-6">{hotel.location}</td>
                <td className="py-3 px-6">{hotel.status}</td>
                <td className="py-3 px-6 text-center">{hotel.roomAvilable}</td>
                <td className="py-3 px-6 space-x-3">{hotel.rating} ⭐</td>
                <td className="py-3 px-6">
                  <div className="flex gap-2">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition">
                      <Link to={`/admin/hotel/${hotel._id}/edit`}>Edit</Link>
                    </button>
                    <button
                      onClick={() => deleteUserById(hotel._id)}
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
              <td colSpan="7" className="py-4 text-center text-gray-500">
                No hotels found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminHotel;
