import { useState,useEffect } from "react";
import { FiSearch ,FiBell,FiLogOut } from "react-icons/fi";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaRegCalendarCheck, FaFileInvoice } from "react-icons/fa";
import { MdRateReview, MdEdit } from "react-icons/md";
import { BsKey, BsChatDots, BsGear } from "react-icons/bs";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../Hooks/ContextApi";
const UserData = () => {
  // const [activeTab, setActiveTab] = useState("Dashboard");

  const [user, setUser] = useState(null);
  // console.log("userdata",user.userData.image)
  const { token } = useAuth();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUser(userData);
        // console.log("set data user ",userData)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);


  return (
<div className="flex h-screen bg-gradient-to-b from-blue-900 to-blue-950">
            <aside className="w-64 bg-gradient-to-b from-gray-800 to-gray-900shadow-md p-5 flex flex-col justify-between ">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-5">My Account</h2>
          <nav className="space-y-4">
            <NavLink
              to="/user/dashboard"
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
              to="/user/edit-profile"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              <MdEdit className="text-xl mr-2" />
              Edit Profile
            </NavLink>

            <NavLink
              to="/user/change-password"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              <BsKey className="text-xl mr-2" />
              Change Password
            </NavLink>
          </nav>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-5">Tour Booking</h2>
          <nav className="space-y-4">
            <NavLink
              to="/user/bookings"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              <FaRegCalendarCheck className="text-xl mr-2" />
              My Booking
            </NavLink>

            <NavLink
              to="/user/review"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              <MdRateReview className="text-xl mr-2" />
              Review
            </NavLink>

            <NavLink
              to="/user/invoice"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              <FaFileInvoice className="text-xl mr-2" />
              Invoices
            </NavLink>

            <NavLink
              to="/user/wishlist"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              <BsChatDots className="text-xl mr-2" />
              Wish List
              <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">5</span>
            </NavLink>
          </nav>
        </div>

        <div>
          <NavLink
            to="/user/setting"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg transition ${
                isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            <BsGear className="text-xl mr-2" />
            Settings
          </NavLink>

          <NavLink
            to="/logout"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg transition ${
                isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            <FiLogOut className="text-xl mr-2" />
            Log out
          </NavLink>
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
          {/* <div className="flex items-center gap-4 mr-5">
            <FiBell className="text-xl cursor-pointer" />
            <div className="flex items-center gap-2">
            <img
                    src={user.userData.image || "https://via.placeholder.com/50"}
                    alt="User Avatar"
                    className="w-14 h-14 rounded-full border"
                  />
              <div>
                <p className="text-sm font-semibold">{user.userData.name}</p>
                <p className="text-xs text-gray-500">{user.userData.email}</p>
              </div>
            </div>
          </div> */}
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

export default UserData;
