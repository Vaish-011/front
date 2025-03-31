import React, { useState } from "react";

const BookmarkedPosts = () => {
    const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

    const toggleBookmark = (postTitle) => {
        setBookmarkedPosts(prev => 
            prev.includes(postTitle) 
                ? prev.filter(title => title !== postTitle) 
                : [...prev, postTitle]
        );
    };

    return (
        <div>
            <h2>Bookmarked Posts</h2>
            <ul>
                {bookmarkedPosts.map((title, index) => (
                    <li key={index}>{title}</li>
                ))}
            </ul>
            <button onClick={() => toggleBookmark("Sample Post")}>Toggle Bookmark</button>
        </div>
    );
};

export default BookmarkedPosts;
