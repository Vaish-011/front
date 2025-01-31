import { FaImage, FaVideo, FaCalendarAlt, FaEdit } from "react-icons/fa";
import axios from 'axios';
import { useEffect, useState } from "react";

const Post = () => {
    const [content, setContent] = useState("");
    const [posts, setPosts] = useState([]);
    const [userId, setUserId] = useState(null); // Store the logged-in user ID

    // Fetch User ID from Local Storage or Session after Login
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUserId(storedUser.id);
        }
    }, []);

    // Fetch Posts
    useEffect(() => {
        axios.get("http://localhost:5000/api/posts/post")
            .then((response) => setPosts(response.data))
            .catch((error) => console.error("Error fetching data", error));
    }, []);

    // Handle Post Submission
    const handlePostSubmit = () => {
        if (!content.trim() || !userId) return alert("Please log in first.");
        
        axios.post("http://localhost:5000/api/posts/post", { content, userId }, { withCredentials: true })
            .then(() => {
                setContent("");
                return axios.get("http://localhost:5000/api/posts/post");
            })
            .then((response) => setPosts(response.data))
            .catch((error) => console.error("Error posting content", error));
    };

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
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>

            <div className="post-actions">
                <button className="action-btn"><FaImage className="action-icon image-icon" /> Photo</button>
                <button className="action-btn"><FaVideo className="action-icon video-icon" /> Video</button>
                <button className="action-btn"><FaCalendarAlt className="action-icon event-icon" /> Event</button>
                <button className="action-btn"><FaEdit className="action-icon article-icon" /> Write Article</button>
            </div>

            <button className="post-button" onClick={handlePostSubmit}>Post</button>

            <h2>Posts</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <strong>{post.name}</strong> - {new Date(post.createdAt).toLocaleString()}
                        <p>{post.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Post;
