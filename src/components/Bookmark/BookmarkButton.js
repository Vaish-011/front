// BookmarkButton.js
import React from "react";
import "./BookmarkButton.css";
import { useBookmarks } from './BookmarkContext';

const BookmarkButton = ({
  postId,
  postTitle,
  postContent,
  postAuthor,
  postTime,
  postImage,
  postVideo,
  postArticleLink,
  onBookmarkToggle, // New prop from parent
}) => {
  const { bookmarkedPosts, toggleBookmark } = useBookmarks();

  const isBookmarked = bookmarkedPosts.some(p => p.post_id === postId);

  const handleClick = () => {
    toggleBookmark({
      post_id: postId,
      title: postTitle || "Untitled",
      content: postContent || "",
      author: postAuthor || "Unknown",
      time: postTime || new Date().toLocaleString(),
      image: postImage || "",
      video: postVideo || "",
      articleLink: postArticleLink || ""
    });

    if (onBookmarkToggle) {
      onBookmarkToggle(!isBookmarked);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bookmark-icon"
      title={isBookmarked ? "Unbookmark" : "Bookmark"}
      aria-pressed={isBookmarked}
    >
      <span className="material-icons">
        {isBookmarked ? "bookmark" : "bookmark_border"}
      </span>
    </button>
  );
};

export default BookmarkButton;
