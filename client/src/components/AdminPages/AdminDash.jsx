import { useEffect, useState } from "react";
import { FiUsers, FiAirplay, FiTruck, FiBriefcase, FiBook } from "react-icons/fi";
import { FiSearch, FiBell } from "react-icons/fi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useAuth } from "../Hooks/ContextApi";
const AdminDash = () => {
  const [stats, setStats] = useState({ hotels: 0, flights: 0, buses: 0, users: 0, bookings: 0 });
  const [recentBookings, setRecentBookings] = useState([]);
const { user } = useAuth();
  useEffect(() => {
    fetch("http://localhost:8080/api/admin/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setStats(data.stats);
        setRecentBookings(data.recentBookings);
      })
      .catch((err) => console.error("Error fetching dashboard data:", err));
  }, []);

  return (
    <div className="p-5">

      <h2 className="text-2xl font-bold mb-5">Admin Dashboard</h2>
       <div className="flex justify-between items-center mb-6">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search something"
              className="w-full p-2 pl-10 border rounded-md"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-500" />
          </div>
          <div className="flex items-center gap-4">
            <FiBell className="text-xl cursor-pointer" />
            <div className="flex items-center gap-2">
              <HiOutlineUserCircle className="text-3xl" />
              <div>
                <p className="text-sm font-semibold">{user.userData.name}</p>
                <p className="text-xs text-gray-500">{user.userData.email}</p>
              </div>
            </div>
          </div>
        </div>
      
      {/* Stats Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard title="Total Users" value={stats.users} icon={<FiUsers />} color="bg-blue-500" />
        <StatCard title="Total Hotels" value={stats.hotels} icon={<FiBriefcase />} color="bg-green-500" />
        <StatCard title="Total Flights" value={stats.flights} icon={<FiAirplay />} color="bg-yellow-500" />
        <StatCard title="Total Buses" value={stats.buses} icon={<FiTruck />} color="bg-red-500" />
        <StatCard title="Total Bookings" value={stats.bookings} icon={<FiBook />} color="bg-purple-500" />
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Recent Bookings</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">User</th>
              <th className="py-2 px-4 text-left">Type</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentBookings.length > 0 ? (
              recentBookings.map((booking, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-4">{booking.user}</td>
                  <td className="py-2 px-4">{booking.type}</td>
                  <td className="py-2 px-4 font-semibold text-green-500">{booking.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-2 px-4 text-center">No recent bookings</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className={`p-4 rounded-lg text-white shadow-md flex items-center justify-between ${color}`}>
      <div>
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="text-3xl">{icon}</div>
    </div>
  );
};

export default AdminDash;
