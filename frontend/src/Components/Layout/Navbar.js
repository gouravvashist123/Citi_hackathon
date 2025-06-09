import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-logo">
      <Link to="/">SRI Social Network</Link>
    </div>
    <ul className="navbar-links">
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/investors">Investors</Link></li>
      <li><Link to="/suggestions">Suggestions</Link></li>
      <li><Link to="/profile">Profile</Link></li>
    </ul>
  </nav>
);

export default Navbar;