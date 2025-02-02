import React, { use, useState } from 'react'
import { FaBell ,  FaSearch , FaInbox , FaCalendarAlt , FaClock ,  FaCheckCircle  } from "react-icons/fa";
import { PiSidebarSimpleBold } from "react-icons/pi";
import './sidebar.css';

function Sidebar({onInboxClick}) {
  
  const [isOpen , setIsOpen] = useState(true);

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className='toggle-icon' onClick={toggleSideBar}>
      <PiSidebarSimpleBold className='icon' />
      </div>

      <nav className='nav-menu'>
      <div className='nav-item'>
        <FaBell className='icon'/> Notification
      </div>
        <div className='nav-item'>
        <FaSearch className='icon' /> Search
        </div>
        <div className='nav-item' onClick={onInboxClick}>
        <FaInbox className='icon'/> Inbox
        </div>
        <div className='nav-item'>
        <FaCalendarAlt className='icon'/> Today
        </div>
        <div className='nav-item'>
        <FaCalendarAlt className='icon'/> Upcoming
        </div>
        <div className='nav-item'>
        <FaClock className='icon' /> Pending Tasks
        </div>
        <div className='nav-item'>
        <FaCheckCircle className='icon' /> Completed Tasks
        </div>
      </nav>
      
    </div>
  );
}

export default Sidebar;
