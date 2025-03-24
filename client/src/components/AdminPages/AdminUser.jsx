import { useAuth } from "../Hooks/ContextApi";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  FiMail,
  FiPhone,
  FiSearch,
  FiCalendar,
  FiMapPin,
  FiShield,
} from "react-icons/fi";

function AdminUser() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const { token } = useAuth();

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const userData = await response.json();
        setUsers(userData);
        // console.log(userData)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserById = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search input
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="p-6 md:p-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          All User Data
        </h2>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search by name, email, country..."
              className="w-full p-2 pl-10 border rounded-md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-3 text-gray-500" />
          </div>

          <div className="flex flex-wrap gap-3 md:gap-6">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user._id} className="bg-white shadow-md rounded-lg p-6">
                <div className="flex items-center gap-4 flex-wrap">
                  <img
                    src={user.image || "https://via.placeholder.com/50"}
                    alt="User Avatar"
                    className="w-14 h-14 rounded-full border"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">{user.name}</h3>
                    <p className="text-gray-600 flex items-center">
                      <FiMail className="mr-2" /> {user.email}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <FiPhone className="mr-2" /> {user.number}
                    </p>
                  </div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Active
                  </span>
                </div>

                <div className="mt-4">
                  <p className="text-gray-600 flex items-center">
                    <FiCalendar className="mr-2" />
                    Joined{" "}
                    {new Date(user.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <FiMapPin className="mr-2" /> {user.country}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <FiShield className="mr-2" /> Customer
                  </p>
                </div>

                <hr className="my-4" />

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex gap-5">
                    <div>
                      <p className="text-gray-600">Total Bookings</p>
                      <p className="text-lg font-bold">
                        {user.totalBookings || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total Spent</p>
                      <p className="text-lg font-bold">${user.totalSpent || 0}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition">
                      <Link to={`/admin/users/${user._id}/edit`}>Edit</Link>
                    </button>
                    <button
                      onClick={() => deleteUserById(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No users found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminUser;
