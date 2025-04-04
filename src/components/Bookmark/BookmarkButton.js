import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BookmarkButton.css";

const BookmarkButton = ({ postId, userId }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/bookmarks/${userId}/${postId}`)
      .then((res) => setIsBookmarked(res.data.isBookmarked))
      .catch((err) => console.error(err));
  }, [postId, userId]);

  const toggleBookmark = () => {
    const newStatus = !isBookmarked;
    setIsBookmarked(newStatus);

    axios
      .post("http://localhost:5000/api/bookmarks", {
        userId,
        postId,
        isBookmarked: newStatus,
      })
      .catch((err) => console.error(err));
  };

  return (
    <button onClick={toggleBookmark} className="bookmark-icon" title={isBookmarked ? "Unbookmark" : "Bookmark"}>
      <span className="material-icons">
        {isBookmarked ? "bookmark" : "bookmark_border"}
      </span>
    </button>
  );
};

export default BookmarkButton;
