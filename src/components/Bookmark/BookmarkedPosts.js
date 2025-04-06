// BookmarkedPosts.js
import React from "react";
import "../Home/styles.css";
import BookmarkButton from "./BookmarkButton";
import { useBookmarks } from "./BookmarkContext";

const BookmarkedPosts = () => {
  const { bookmarkedPosts } = useBookmarks();

  return (
    <div className="feed-container">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Bookmarked Posts</h2>

      {bookmarkedPosts.length === 0 ? (
        <p style={{ textAlign: "center", fontStyle: "italic" }}>No bookmarks yet.</p>
      ) : (
        bookmarkedPosts.map((post, index) => (
          <div className="post-card card shadow-3d" key={post.post_id || index}>
            <div className="post-header">
              <div className="avatar"></div>
              <div className="post-info">
                <h3 className="post-author">{post.author}</h3>
                <p className="post-time">{post.time}</p>
              </div>
            </div>

            <p className="post-content">{post.content}</p>

            {/* 📸 Show image if available */}
            {post.image && (
              <div className="post-media">
                <img src={post.image} alt="Post" className="post-image" />
              </div>
            )}

            {/* 🎥 Show video if available */}
            {post.video && (
              <div className="post-media">
                <video controls className="post-video">
                  <source src={post.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            {/* 🔗 Show article link if available */}
            {post.articleLink && (
              <div className="post-article">
                <a href={post.articleLink} target="_blank" rel="noopener noreferrer">
                  📄 Read Article
                </a>
              </div>
            )}

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
                postImage={post.image}
                postVideo={post.video}
                postArticleLink={post.articleLink}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BookmarkedPosts;
