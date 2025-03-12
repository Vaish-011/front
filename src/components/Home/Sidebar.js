import React from "react";
import { FaTimes, FaUser, FaStar, FaComment, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
            <FaTimes className="close-btn" onClick={toggleSidebar} />
            <ul>
                <li onClick={toggleSidebar}>
                    <FaUser />
                    <Link to="/user">Dashboard</Link>
                </li>
                <li onClick={toggleSidebar}>
                    <FaStar />
                    <Link to="/tasklist">To do Remainders</Link>
                </li>
                <li onClick={toggleSidebar}>
                    <FaComment />
                    <Link to="/feedback">Feedback</Link>
                </li>
                <li onClick={handleLogout}>
                    <FaSignOutAlt />
                    Logout
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;