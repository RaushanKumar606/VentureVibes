import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Hotel, Train, Flight, DirectionsBus, Menu, Login, HowToReg } from "@mui/icons-material";

const FlightNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Left Logo */}
        <div>
          <img
            src="/assets/Images/flight-logo1.png"
            alt="logo"
            className="h-12 rounded-full"
          />
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6">
          {navLinks.map((link, index) => (
            <Link to={link.path} key={index} className="flex items-center gap-2 text-white hover:text-gray-300">
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Hamburger Menu for Mobile */}
        <button onClick={toggleMenu} className="md:hidden text-white">
          <Menu />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700 p-4 flex flex-col gap-4">
          {navLinks.map((link, index) => (
            <Link to={link.path} key={index} className="flex items-center gap-2 text-white hover:text-gray-300">
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

const navLinks = [
  { path: "/", label: "Home", icon: <Home /> },
  { path: "/hotel", label: "Hotel", icon: <Hotel /> },
  { path: "/train", label: "Train", icon: <Train /> },
  { path: "/flight", label: "Air", icon: <Flight /> },
  { path: "/bus", label: "Bus", icon: <DirectionsBus /> },
  { path: "/signup", label: "SignUp", icon: <HowToReg /> },
  { path: "/login", label: "Login", icon: <Login /> },
];

export default FlightNavbar;