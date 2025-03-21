// import { useState } from "react";
// import { NavLink, Outlet } from "react-router-dom";
// import flightImage from "../../../public/assets/Images/flightImage.png";
// const AdminPage = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className=" "   style={{ marginLeft: "240px" }}>
//       {/* Sidebar */}
    
//       <div
//         className={`fixed top-15 left-0 mt-0 h-full w-60 bg-gray-900 text-white transform ${
//           isOpen ? "translate-x-0" : "-translate-x-64"
//         } transition-transform duration-300 ease-in-out p-4`}
//       >
//         <h1 className="text-xl font-bold mb-4">Travelar</h1>
//         <ul className="space-y-2">
//           <li>
//             <NavLink
//               to="/admin/dashboard"
//               className="block px-4 py-2 rounded hover:bg-gray-700"
//             >
//               Dashboard
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/admin/users"
//               className="block px-4 py-2 rounded hover:bg-gray-700"
//             >
//               Users
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/admin/booking"
//               className="block px-4 py-2 rounded hover:bg-gray-700"
//             >
//               Bookings
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/admin/flights"
//               className="block px-4 py-2 rounded hover:bg-gray-700"
//             >
//               Flight
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/admin/hotels"
//               className="block px-4 py-2 rounded hover:bg-gray-700"
//             >
//               Hotels
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/admin/bus"
//               className="block px-4 py-2 rounded hover:bg-gray-700"
//             >
//               Bus
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/admin/tours"
//               className="block px-4 py-2 rounded hover:bg-gray-700"
//             >
//               Tour
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/admin/visa"
//               className="block px-4 py-2 rounded hover:bg-gray-700"
//             >
//               Visa
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/admin/offers"
//               className="block px-4 py-2 rounded hover:bg-gray-700"
//             >
//               Offers
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/admin/setting"
//               className="block px-4 py-2 rounded hover:bg-gray-700"
//             >
//               Setting
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/admin/generic-page"
//               className="block px-4 py-2 rounded hover:bg-gray-700"
//             >
//               Generic Pages
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/"
//               className="block px-4 py-2 rounded hover:bg-gray-700"
//             >
//               Home
//             </NavLink>
//           </li>
//         </ul>
//         <NavLink to="/admin/content-admin">
//           <button className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//             Contact Super Admin
//           </button>
//         </NavLink>
//       </div>

//       {/* Main Content */}
//       <div
//   className="flex-1 min-h-screen bg-green-300 bg-cover bg-center bg-no-repeat relative"
//   style={{ backgroundImage: `url(${flightImage})` }}
// >                  <button
//           className="absolute top-3  bg-gray-900 text-white p-2 rounded focus:outline-none"
//           onClick={toggleSidebar}
//           style={{ marginLeft: "" }}
//         >
//           ☰
//         </button>
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default AdminPage




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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-5">Admin Dashboard</h2>
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


      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Top Bar */}
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
              <div>
                <p className="text-sm font-semibold">{user.userData.name}</p>
                <p className="text-xs text-gray-500">{user.userData.email}</p>
              </div>
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
