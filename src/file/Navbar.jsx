import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "./Components/logos.png";


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo-image" />
        </Link>
      </div>
      <div className="home-button">
        <Link to="/" className="home-link">
          HOME
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
