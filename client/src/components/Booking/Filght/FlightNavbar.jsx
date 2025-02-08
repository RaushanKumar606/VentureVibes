

import { useState } from "react";
  import './Flight.css';
  const FlightNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    return (
      <nav className="navbar">
        <div className="navbar-left">
        <img
            src="/assets/Images/flight-logo1.png"
            alt="logo"
            className="flight-logo"
          />
        </div>
        <div className={`navbar-right ${isMenuOpen ? "active" : ""}`}>
          <ul className="nav-items">
            <li className="nav-item">
              <a href="#">Home</a>
            </li>
            <li className="nav-item">
              <a href="# ">About </a>
            </li>
            <li className="nav-item">
              <a href="# ">Seats </a>
            </li>
              
          </ul>
        </div>
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
      </nav>
    );
  };
  
  export default FlightNavbar;
