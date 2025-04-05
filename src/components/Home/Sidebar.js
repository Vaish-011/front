import React from "react";
import {
  FaTimes,
  FaUser,
  FaStar,
  FaComment,
  FaSignOutAlt,
  FaBookmark,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { useBookmarks } from '../Bookmark/BookmarkContext'; 
import BookmarkedPosts from '../Bookmark/BookmarkedPosts'; 

const Sidebar = ({ isOpen, toggleSidebar, bookmarkedPosts = [] }) => {
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
        <li onClick={toggleSidebar}>
          <FaBookmark />
          <Link to="/bookmark">Bookmark</Link>
        </li>

         {/* Updated: Dynamically render bookmarked posts from context */}
         {bookmarkedPosts && bookmarkedPosts.length > 0 && (
          <ul className="bookmarked-list">
            {bookmarkedPosts.map((post) => (
              <li key={post.id} onClick={toggleSidebar}>
                <Link to={`/bookmark/${post.id}`}>🔖 {post.title}</Link>
              </li>
            ))}
          </ul>
        )}

        <li onClick={handleLogout}>
          <FaSignOutAlt />
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
