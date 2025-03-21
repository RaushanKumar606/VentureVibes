import { useEffect, useState } from "react";
import {
  FiUsers,
  FiAirplay,
  FiTruck,
  FiBriefcase,
  FiBook,
} from "react-icons/fi";
import { FiSearch, FiBell } from "react-icons/fi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useAuth } from "../Hooks/ContextApi";

const AdminDash = () => {
 
  const [allUser, setAllUser] = useState({ users: 0 });
  const [allHotel, setAllHotel] = useState({ hotels: 0 });
  const [allFlight, setAllFlight] = useState({ flights: 0 });
  const [allBus, setAllBus] = useState({ buses: 0 });
  const [allBooking, setBooking] = useState({ booking: 0 });
  const [tour, setTour] = useState({ tours: 0 });
  const [recentBookings, setRecentBookings] = useState([]);
  // yaha pe jo user abhi abhi booking kiya hai uska data aayega uska logic likhana baki hai thik

  const { token, user } = useAuth();

  const getAllUser = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/total-users",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setAllUser(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
 
  const getAllFlight = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/total-flights",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setAllFlight(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const getAllBus = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/total-bus",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setAllBus(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const getAllHotel = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/total-hotels",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setAllHotel(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getAllBooking = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/total-bookings",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setBooking(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
 
  const GetAllTours = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/total-tours",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setTour(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    GetAllTours(), getAllHotel(), getAllBus(),
    getAllBooking(), getAllFlight(),  getAllUser();
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
        
      </div>

      {/* Stats Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Users"
          value={allUser.totalUser}
          icon={<FiUsers />}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Hotels"
          value={allHotel.totalHotel}
          icon={<FiBriefcase />}
          color="bg-green-500"
        />
        <StatCard
          title="Total Flights"
          value={allFlight.totalflight}
          icon={<FiAirplay />}
          color="bg-yellow-500"
        />
        <StatCard
          title="Total Buses"
          value={allBus.totalBus}
          icon={<FiTruck />}
          color="bg-red-500"
        />
        <StatCard
          title="Total Bookings"
          value={allBooking.totalBooking}
          icon={<FiBook />}
          color="bg-purple-500"
        />
        <StatCard
          title="Total Tours"
          value={tour.totalTours}
          icon={<FiBook />}
          color="bg-purple-500"
        />
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
                  <td className="py-2 px-4 font-semibold text-green-500">
                    {booking.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-2 px-4 text-center">
                  No recent bookings
                </td>
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
    <div
      className={`p-4 rounded-lg text-white shadow-md flex items-center justify-between ${color}`}
    >
      <div>
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="text-3xl">{icon}</div>
    </div>
  );
};

export default AdminDash;
