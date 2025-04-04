import React, { useEffect, useState } from "react";
import axios from "axios";

const BookmarkedPosts = ({ userId }) => {
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch bookmarked post IDs for the user from the backend
    axios
      .get(`http://localhost:5000/api/bookmarks/${userId}`)
      .then((res) => {
        // res.data.bookmarkedPosts will be an array of { post_id: "..." }
        setBookmarkedPosts(res.data.bookmarkedPosts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookmarks", err);
        setLoading(false);
      });
  }, [userId]);

  return (
    <div>
      <h2>Bookmarked Posts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : bookmarkedPosts.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        <ul>
          {bookmarkedPosts.map((post, index) => (
            <li key={index}>Post ID: {post.post_id}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookmarkedPosts;
