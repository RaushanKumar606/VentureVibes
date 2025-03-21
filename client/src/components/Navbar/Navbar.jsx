import { useState } from "react";
import { useAuth } from "../Hooks/ContextApi";
import { useNavigate } from "react-router-dom";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isLoggedIn, user, LogoutUser } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleDropdownToggle = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  const redirectDashboard = (e) => {
    e.stopPropagation();
    navigate(user?.userData?.isAdmin ? "/admin/dashboard" : "/user/dashboard");
    closeDropdown();
  };

  const handleLogout = async () => {
    try {
        await LogoutUser();  
        localStorage.removeItem("token");
        toast.success("Logout Successfully");
       // navigate("/login");  
        window.location.href = "/login";
    } catch (error) {
        console.error("Logout failed:", error);
    }
};

  return (
    <div className="bg-white shadow-md w-full">
      <nav className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="assets/Images/logo.png" alt="logo" className="h-12 w-auto" />
          <a href="/" className="text-xl font-bold flex items-center gap-1">
            <div className="bg-blue-600 text-white px-2 py-1 rounded-lg">JOIN</div>
            <span className="text-gray-700">
              World <span className="text-blue-600">PRIME</span>
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        {/* <div className={`lg:flex items-center space-x-6 ${isMenuOpen ? "block" : "hidden"} lg:block`}>
          <ul className="flex flex-col lg:flex-row gap-4 lg:gap-8 text-gray-700">
            {["/", "Bus", "Hotels", "Train", "Air", "Tours"].map((item, index) => (
              <li key={index}>
                <a href={`/${item.toLowerCase()}`} className="hover:text-blue-600">{item}</a>
              </li>
            ))}
          </ul>
        </div>  */}
        <div className={`lg:flex items-center space-x-6 ${isMenuOpen ? "block" : "hidden"} lg:block`}>
        <ul className="flex flex-col lg:flex-row gap-4 lg:gap-8 text-gray-700">
          <a href="/"><li>Home</li>
          </a>
          <a href="/hotel" className="hover:text-blue-600"><li>Hotel</li></a>
          <a href="/bus" className="hover:text-blue-600"><li>Bus</li></a>
          <a href="/train" className="hover:text-blue-600"><li>Train</li>
          </a>
          <a href="/air" className="hover:text-blue-600"><li>Air</li></a>
          <a href="/tours" className="hover:text-blue-600"><li>Tours</li></a>
          </ul>
        </div>


        {/* User Profile Dropdown */}
        <div className="relative">
          <FaUser className="cursor-pointer" size={20} onClick={handleDropdownToggle} />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
              <ul>
                {isLoggedIn ? (
                  <>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={redirectDashboard}>Your Profile</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>Sign Out</li>
                  </>
                ) : (
                  <li>
                    <a href="/login" className="hover:text-blue-600 block px-4 py-2">Sign In</a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden text-3xl" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
