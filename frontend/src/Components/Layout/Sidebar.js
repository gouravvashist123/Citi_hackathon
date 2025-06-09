import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <aside className="sidebar">
    <ul>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/investors">Investors</Link></li>
      <li><Link to="/suggestions">AI Suggestions</Link></li>
      <li><Link to="/profile">Profile</Link></li>
    </ul>
  </aside>
);

export default Sidebar;