import { useState } from "react";
import './Navbar.css';
import { useAuth } from "../Hooks/ContextApi/ContextApi";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {isLoggedIn} = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="nav_contaner">
    <nav className="navbar">
      <div className="navbar-left">
        {/* <h1 className="logo">The World Awaits</h1> */}
        <img src="assets\Images\logo.png" alt="logo" className="logo" />
      </div>
      <div className={`navbar-right ${isMenuOpen ? "active" : ""}`}>
        <ul className="nav-items">
          <li className="nav-item">
            <a href="/">Home</a>
          </li>
          <li className="nav-item">
            <a href="/booking ">Booking </a>
          </li>
          <li className="nav-item">
            <a href="tours ">Tours </a>
          </li>
             
             {isLoggedIn ? (
          <>
            <li className="nav-item">
            <a href="/dashboard">Dashboard</a>
          </li>
          <li className="nav-item">
                <a href="/logout">Logout</a>
              </li>
          
          </>
              
                
             ):(
              <>
            
              <li className="nav-item">
              <a href="/signup">Sign Up</a>
            </li>
            <li className="nav-item">
              <a href="/login">Login</a>
            </li>
            </>
             )
            }
        </ul>
      </div>
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
    </nav>
    </div>
  );
};

export default Navbar;
