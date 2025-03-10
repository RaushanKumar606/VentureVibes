import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform duration-300 ease-in-out p-4`}
      >
        <h1 className="text-xl font-bold mb-4">Trouvaille</h1>
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
              to="/admin/b2b"
              className="block px-4 py-2 rounded hover:bg-gray-700"
            >
              B2B
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
          className="absolute top-4 left-4 bg-gray-900 text-white p-2 rounded focus:outline-none"
          onClick={toggleSidebar}
        >
          ☰
        </button>
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
