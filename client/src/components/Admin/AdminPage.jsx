
// import { useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { FiSearch ,FiBell, } from "react-icons/fi";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaRegCalendarCheck,  } from "react-icons/fa";
import {  MdEdit } from "react-icons/md";
import { BsKey, } from "react-icons/bs";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../Hooks/ContextApi";
const AdminPage = () => {
  // const [activeTab, setActiveTab] = useState("Dashboard");
const {user} = useAuth();
  return (
    <div className="flex h-screen bg-gradient-to-b from-blue-900 to-blue-950">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-gray-800 to-gray-900 shadow-md p-5 flex flex-col justify-between text-white">
        <div>
        <h2 className="text-2xl font-bold text-white mb-5">Admin Dashboard</h2>
          <nav className="space-y-4">
            <NavLink
               to="/admin/dashboard"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              <AiOutlineDashboard className="text-xl mr-2" />
              Dashboard
            </NavLink>

            <NavLink
                  to="/admin/users"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              <MdEdit className="text-xl mr-2" />
              Users
            </NavLink>

            <NavLink
               to="/admin/booking"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              <FaRegCalendarCheck className="text-xl mr-2" />
              Bookings
            </NavLink>

            <NavLink
                to="/admin/flights"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              <BsKey className="text-xl mr-2" />
              Flight
            </NavLink>
                 
            <NavLink
                to="/admin/hotels"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              <BsKey className="text-xl mr-2" />
              Hotels
            </NavLink>

            <NavLink
                to="/admin/bus"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              <BsKey className="text-xl mr-2" />
              Bus
            </NavLink>

            <NavLink
                to="/admin/tours"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              <BsKey className="text-xl mr-2" />
              Tours
            </NavLink>

            <NavLink
                to="/admin/visa"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              <BsKey className="text-xl mr-2" />
              Visa
            </NavLink>

          </nav>
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full max-w-md ml-5">
            <input
              type="text"
              placeholder="Search something"
              className="w-full p-2 pl-10 border rounded-md"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-500" />
          </div>
          <div className="flex items-center gap-4 mr-5">
            <FiBell className="text-xl cursor-pointer" />
            <div className="flex items-center gap-2">
              <HiOutlineUserCircle className="text-3xl" />
              {/* <div>
                <p className="text-sm font-semibold">{user.userData.name}</p>
                <p className="text-xs text-gray-500">{user.userData.email}</p>
              </div> */}
            </div>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, active, setActiveTab, badge }) => (
  <div
    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition ${
      active === label
        ? "bg-blue-500 text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`}
    onClick={() => setActiveTab(label)}
  >
    <div className="flex items-center gap-2">
      <Icon className="text-xl" />
      <span>{label}</span>
    </div>
    {badge && (
      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
        {badge}
      </span>
    )}
  </div>
);

export default AdminPage;
