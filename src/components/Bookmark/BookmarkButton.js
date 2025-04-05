import React from "react";
import "./BookmarkButton.css";
import { useBookmarks } from './BookmarkContext';

const BookmarkButton = ({ postId, postTitle, postContent, postAuthor, postTime }) => {
  const { bookmarkedPosts, toggleBookmark } = useBookmarks();

  const isBookmarked = bookmarkedPosts.some(p => p.post_id === postId);

  const handleClick = () => {
    toggleBookmark({
      post_id: postId,
      title: postTitle,
      content: postContent,
      author: postAuthor,
      time: postTime,
    });
  };

  return (
    <button
      onClick={handleClick}
      className="bookmark-icon"
      title={isBookmarked ? "Unbookmark" : "Bookmark"}
    >
      <span className="material-icons">
        {isBookmarked ? "bookmark" : "bookmark_border"}
      </span>
    </button>
  );
};

export default BookmarkButton;
