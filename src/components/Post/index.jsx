import { FaImage, FaVideo, FaCalendarAlt, FaEdit } from "react-icons/fa";

const Post = () => {
    return (
        <div className="post-container">
            <div className="post-header">
                <img 
                    src="https://via.placeholder.com/50" 
                    alt="User" 
                    className="profile-pic"
                />
                <textarea
                    placeholder="Start a post..."
                    className="post-textarea"
                />
            </div>

            <div className="post-actions">
                <button className="action-btn">
                    <FaImage className="action-icon image-icon" /> Photo
                </button>
                <button className="action-btn">
                    <FaVideo className="action-icon video-icon" /> Video
                </button>
                <button className="action-btn">
                    <FaCalendarAlt className="action-icon event-icon" /> Event
                </button>
                <button className="action-btn">
                    <FaEdit className="action-icon article-icon" /> Write Article
                </button>
            </div>

            <button className="post-button">
                Post
            </button>
        </div>
    );
};

export default Post;
