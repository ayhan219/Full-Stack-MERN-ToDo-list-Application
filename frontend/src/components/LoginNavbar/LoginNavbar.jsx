import React from "react";
import "./LoginNavbar.css";
import { Link, useNavigate } from "react-router-dom";

const LoginNavbar = ({ handleSetLogin }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Remove authToken from localStorage
    localStorage.removeItem("authToken");

    // Update login state
    handleSetLogin(false);

    // Redirect to home page
    navigate("/login");
  };

  return (
    <nav className="navbar">
     <Link to={"/"} className="link"> <div className="navbar-logo">Logo</div></Link>
      <div className="navbar-links">
        <a href="/createtodo" className="navbar-link">
          Create ToDo
        </a>
        <button onClick={handleSignOut} className="navbar-link">
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default LoginNavbar;
