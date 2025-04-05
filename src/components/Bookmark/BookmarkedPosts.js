// BookmarkedPosts.js
import React from "react";
import "../Home/styles.css";
import BookmarkButton from "./BookmarkButton";
import { useBookmarks } from "./BookmarkContext";

const BookmarkedPosts = () => {
  const { bookmarkedPosts } = useBookmarks();
  const loading = false;

  return (
    <div className="feed-container">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Bookmarked Posts</h2>

      {loading ? (
        <p>Loading...</p>
      ) : bookmarkedPosts.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        bookmarkedPosts.map((post, index) => (
          <div className="post-card card shadow-3d" key={index}>
            <div className="post-header">
              <div className="avatar"></div>
              <div className="post-info">
                <h3 className="post-author">{post.author}</h3>
                <p className="post-time">{post.time}</p>
              </div>
            </div>
            <p className="post-content">{post.content}</p>
            <div className="post-actions">
              <button className="action-button shadow-3d">Like</button>
              <button className="action-button shadow-3d">Comment</button>
              <button className="action-button shadow-3d">Share</button>
              <BookmarkButton
                postId={post.post_id}
                postTitle={post.title}
                postContent={post.content}
                postAuthor={post.author}
                postTime={post.time}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BookmarkedPosts;
