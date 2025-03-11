import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminPage = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" "   style={{ marginLeft: "240px" }}>
      {/* Sidebar */}
    
      <div
        className={`fixed top-0 left-0 mt-0 h-full w-60 bg-gray-900 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform duration-300 ease-in-out p-4`}
      >
        <h1 className="text-xl font-bold mb-4">Travelar</h1>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/admin/dashboard"
              className="block px-4 py-2 rounded hover:bg-gray-700"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/users"
              className="block px-4 py-2 rounded hover:bg-gray-700"
            >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/booking"
              className="block px-4 py-2 rounded hover:bg-gray-700"
            >
              Bookings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/flights"
              className="block px-4 py-2 rounded hover:bg-gray-700"
            >
              Flight
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/hotels"
              className="block px-4 py-2 rounded hover:bg-gray-700"
            >
              Hotels
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/Bus"
              className="block px-4 py-2 rounded hover:bg-gray-700"
            >
              Bus
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/tours"
              className="block px-4 py-2 rounded hover:bg-gray-700"
            >
              Tour
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/visa"
              className="block px-4 py-2 rounded hover:bg-gray-700"
            >
              Visa
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/offers"
              className="block px-4 py-2 rounded hover:bg-gray-700"
            >
              Offers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/setting"
              className="block px-4 py-2 rounded hover:bg-gray-700"
            >
              Setting
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/generic-page"
              className="block px-4 py-2 rounded hover:bg-gray-700"
            >
              Generic Pages
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className="block px-4 py-2 rounded hover:bg-gray-700"
            >
              Home
            </NavLink>
          </li>
        </ul>
        <NavLink to="/admin/content-admin">
          <button className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Contact Super Admin
          </button>
        </NavLink>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-screen bg-gray-100">
        <button
          className="absolute top-3 left-20 bg-gray-900 text-white p-2 rounded focus:outline-none"
          onClick={toggleSidebar}
          style={{ marginLeft: "30px" }}
        >
          ☰
        </button>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage