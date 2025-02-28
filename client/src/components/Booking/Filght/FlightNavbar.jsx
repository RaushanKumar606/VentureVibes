import { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import { Home, Hotel, Train, Flight, DirectionsBus, Menu, Login,HowToReg } from "@mui/icons-material";
import { Link } from "react-router-dom";

const FlightNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        {/* Left Logo */}
        <Box sx={{ flexGrow: 1 }}>
          <img
            src="/assets/Images/flight-logo1.png"
            alt="logo"
            style={{ height: "50px", borderRadius:'50%' }}
          />
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          <Link to="/" style={navStyle}>
            <Home />
            <Typography variant="body1">Home</Typography>
          </Link>

          <Link to="/hotel" style={navStyle}>
            <Hotel />
            <Typography variant="body1">Hotel</Typography>
          </Link>

          <Link to="/train" style={navStyle}>
            <Train />
            <Typography variant="body1">Train</Typography>
          </Link>

          <Link to="/flight" style={navStyle}>
            <Flight />
            <Typography variant="body1">Air</Typography>
          </Link>

          <Link to="/bus" style={navStyle}>
            <DirectionsBus />
            <Typography variant="body1">Bus</Typography>
          </Link>
          
          <Link to="/signup" style={navStyle}>
          <HowToReg />
            <Typography variant="body1">SingUp</Typography>
          </Link>

          
          <Link to="/login" style={navStyle}>
          <Login />
            <Typography variant="body1">Login</Typography>
          </Link>
        </Box>

        {/* Hamburger Menu for Mobile */}
        <IconButton
          edge="end"
          color="inherit"
          onClick={toggleMenu}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <Menu />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

// Common Navigation Link Styles
const navStyle = {
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  color: "white",
  gap: "8px",
};

export default FlightNavbar;
