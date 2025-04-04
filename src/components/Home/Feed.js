import React from "react";
import "./styles.css";
import BookmarkButton from "../Bookmark/BookmarkButton";

function Feed() {
  // Simulated user ID and post IDs
  const userId = 1;
  return (
    <div className="feed-container">
      {/* Create Post Box */}
      

      {/* Post Card 1 */}
      <div className="post-card card shadow-3d">
        <div className="post-header">
          <div className="avatar"></div>
          <div className="post-info">
            <h3 className="post-author">Author Name</h3>
            <p className="post-time">Time Ago</p>
          </div>
        </div>
        <p className="post-content">Post content will be displayed here...</p>
        <div className="post-actions">
          <button className="action-button shadow-3d">Like</button>
          <button className="action-button shadow-3d">Comment</button>
          <button className="action-button shadow-3d">Share</button>
          <BookmarkButton postId={101} userId={userId} />
        </div>
      </div>

      {/* Post Card 2 */}
      <div className="post-card card shadow-3d">
        <div className="post-header">
          <div className="avatar"></div>
          <div className="post-info">
            <h3 className="post-author">Author Name</h3>
            <p className="post-time">Time Ago</p>
          </div>
        </div>
        <p className="post-content">Post content will be displayed here...</p>
        <div className="post-actions">
          <button className="action-button shadow-3d">Like</button>
          <button className="action-button shadow-3d">Comment</button>
          <button className="action-button shadow-3d">Share</button>

        </div>
      </div>
      {/* Post Card 2 */}
      <div className="post-card card shadow-3d">
        <div className="post-header">
          <div className="avatar"></div>
          <div className="post-info">
            <h3 className="post-author">Author Name</h3>
            <p className="post-time">Time Ago</p>
          </div>
        </div>
        <p className="post-content">Post content will be displayed here...</p>
        <div className="post-actions">
          <button className="action-button shadow-3d">Like</button>
          <button className="action-button shadow-3d">Comment</button>
          <button className="action-button shadow-3d">Share</button>
          <BookmarkButton postId={102} userId={userId} /> 
        </div>
      </div>
      {/* Post Card 2 */}
      <div className="post-card card shadow-3d">
        <div className="post-header">
          <div className="avatar"></div>
          <div className="post-info">
            <h3 className="post-author">Author Name</h3>
            <p className="post-time">Time Ago</p>
          </div>
        </div>
        <p className="post-content">Post content will be displayed here...</p>
        <div className="post-actions">
          <button className="action-button shadow-3d">Like</button>
          <button className="action-button shadow-3d">Comment</button>
          <button className="action-button shadow-3d">Share</button>
        </div>
      </div>
      

      {/* More Posts... */}
    </div>
  );
}

export default Feed;
