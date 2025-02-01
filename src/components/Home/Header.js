import React, { useState } from "react";
import { FaSearch,FaHome, FaUserFriends, FaSuitcase, FaBell, FaComment, FaBars ,FaPlus } from "react-icons/fa";
import Sidebar from "./Sidebar";
import "./styles.css";

function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev); 
    
  };

  return (
    <>
      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Header Section */}
      <div className="headerHome">
        <FaBars className="hamburger" size={25} onClick={toggleSidebar} />

        <h1 className="logo">ConnectHive</h1>

        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search" className="input-3d" />
        </div>

        <div className="nav-icons">
          {/* Add Post Icon */}
          <div className="icon-container" title="Add Post">
            <FaPlus className="icon-3d" />
          </div>  
          <div className="icon-container" title="Home">
            <FaHome className="icon-3d" />
          </div>
          <div className="icon-container" title="Friends">
            <FaUserFriends className="icon-3d" />
          </div>
          <div className="icon-container" title="AI-Resumebuilder">
            <FaSuitcase className="icon-3d" />
          </div>
          <div className="icon-container" title="Notifications">
            <FaBell className="icon-3d" />
          </div>
          <div className="icon-container" title="Messages">
            <FaComment className="icon-3d" />
          </div>
          
        </div>
      </div>
    </>
  );
}

export default Header; 