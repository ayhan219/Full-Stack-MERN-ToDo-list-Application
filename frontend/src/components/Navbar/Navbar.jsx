import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to={"/"} className='link'> <div className="navbar-logo">Logo</div></Link>
      <div className="navbar-links">
        <a href="/login" className="navbar-link">Login</a>
        <a href="/signup" className="navbar-link">Signup</a>
      </div>
    </nav>
  );
};

export default Navbar;
