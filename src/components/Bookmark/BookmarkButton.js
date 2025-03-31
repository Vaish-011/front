import React, { useState } from "react";

const BookmarkButton = () => {
    const [isBookmarked, setIsBookmarked] = useState(false);

    const toggleBookmark = () => {
        setIsBookmarked(prev => !prev);
    };

    return (
        <button onClick={toggleBookmark}>
            {isBookmarked ? "Unbookmark" : "Bookmark"}
        </button>
    );
};

export default BookmarkButton;
