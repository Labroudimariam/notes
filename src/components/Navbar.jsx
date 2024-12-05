import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logout from "./Logout";
import { FaBars, FaTimes } from "react-icons/fa";
import "./navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <h2>My Notes</h2>

      {/* Burger Menu Icon */}
      <div className="burger-icon" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Links */}
      <ul className={`navbar-list ${isMenuOpen ? "active" : ""}`}>
        <li>
          <NavLink to="/add-note" activeClassName="active">
            <button className="navbar-btn">Add New Note</button>
          </NavLink>
        </li>
        <li>
          <Logout className="navbar-btn" />
        </li>
        <li>
          <NavLink to="/update-password" activeClassName="active">
            <button className="navbar-btn">Update Password</button>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
