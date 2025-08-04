import React from "react";
import "./Navbar.css";

const Navbar = ({ username, logout }) => {
  return (
        <div className="navbar">
        <div className="navbar-left">
            <div className="navbar-logo">RentEasy</div>
        </div>
        <div className="navbar-right">
            <span className="navbar-username">{username}</span>
            <button className="logout-button" onClick={logout}>Logout</button>
        </div>
    </div>

  );
};

export default Navbar;
