import React, { useState } from "react";
import { FaSearch,FaHome, FaUserFriends, FaSuitcase, FaBell, FaComment, FaBars ,FaPlus } from "react-icons/fa";
import Sidebar from "./Sidebar";
import "./styles.css";
import { useNavigate } from "react-router-dom";


function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

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
          <div className="icon-container" title="Add Post" onClick={()=>navigate('/post')}>
            <FaPlus className="icon-3d" />
          </div>  
          <div className="icon-container" title="Home">
            <FaHome className="icon-3d" />
          </div>
          <div className="icon-container" title="Friends" onClick={()=>navigate('/connect')}>
            <FaUserFriends className="icon-3d" />
          </div>
          <div className="icon-container" title="AI-Resumebuilder">
            <FaSuitcase className="icon-3d" onClick={()=>navigate('/resume')} />
          </div>
          <div className="icon-container" title="Notifications" onClick={() => navigate('/notification')}>
            <FaBell className="icon-3d" />
          </div>

          <div className="icon-container" title="Messages" onClick={()=>navigate('/chat')}>
            <FaComment className="icon-3d" />
          </div>
          
        </div>
      </div>
    </>
  );
}

export default Header; 