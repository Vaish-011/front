import React from "react";
import { FaTimes, FaUser, FaStar, FaComment, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link from React Router
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <FaTimes className="close-btn" onClick={toggleSidebar} />
      <ul>
        <li onClick={toggleSidebar}>
          <FaUser />
          <Link to="/" >Dashboard</Link>
        </li>
        <li onClick={toggleSidebar}>
          <FaStar />
          <Link to="/rate-us">Rate Us</Link>
        </li>
        <li onClick={toggleSidebar}>
          <FaComment />
          <Link to="/feedback">Feedback</Link>
        </li>
        <li onClick={toggleSidebar}>
          <FaSignOutAlt />
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
