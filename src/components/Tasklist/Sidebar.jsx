import React, { useState } from 'react';
import { FaBell, FaSearch, FaInbox, FaCalendarAlt, FaClock, FaCheckCircle } from 'react-icons/fa';
import { PiSidebarSimpleBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './sidebar.css';

function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <PiSidebarSimpleBold className="toggle-icon" onClick={toggleSidebar} />

      <ul className="nav-menu">
        <li className="nav-item">
          <FaBell className="icon" />
          <Link to="/tasklist/notifications">Notifications</Link>
        </li>
        {/* <li className="nav-item">
          <FaSearch className="icon" /> 
          <Link to="/tasklist/search">Search</Link>
        </li> */}
        <li className="nav-item" >
          <FaInbox className="icon" />
          <Link to="/tasklist">Inbox</Link>
        </li>
        <li className="nav-item">
          <FaCalendarAlt className="icon" />
          <Link to="/tasklist/today">Today</Link>
        </li>
        <li className="nav-item" >
          <FaCalendarAlt className="icon" />
          <Link to="/tasklist/upcoming">Upcoming</Link>
        </li>
        <li className="nav-item" >
          <FaClock className="icon" />
          <Link to="/tasklist/pending">Pending Tasks</Link>
        </li>
        <li className="nav-item" >
          <FaCheckCircle className="icon" /> 
          <Link to="/tasklist/completed">Completed Tasks</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
