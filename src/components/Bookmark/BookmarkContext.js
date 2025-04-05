// BookmarkContext.js
import React, { createContext, useContext, useState } from "react";

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  const toggleBookmark = (post) => {
    setBookmarkedPosts((prev) => {
      const exists = prev.some((p) => p.post_id === post.post_id);
      if (exists) {
        return prev.filter((p) => p.post_id !== post.post_id);
      } else {
        return [...prev, post];
      }
    });
  };

  return (
    <BookmarkContext.Provider value={{ bookmarkedPosts, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarkContext);
