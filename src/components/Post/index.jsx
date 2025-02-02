import { useEffect, useState } from "react";
import { FaImage, FaVideo, FaCalendarAlt, FaEdit } from "react-icons/fa";
import axios from "axios";

const Post = () => {
    const [content, setContent] = useState("");
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState("");

    // Fetch User from Local Storage
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            setUser(storedUser);
            setToken(storedToken);
        }
    }, []);

    // Fetch Posts
    useEffect(() => {
        axios.get("http://localhost:5000/api/posts/post")
            .then(response => setPosts(response.data))
            .catch(error => console.error("Error fetching posts:", error));
    }, []);

    // Handle Post Submission
    const handlePostSubmit = async () => {
        if (!content.trim()) {
            alert("Post content cannot be empty.");
            return;
        }
        if (!token) {
            alert("Please log in first.");
            return;
        }

        try {
            await axios.post("http://localhost:5000/api/posts/post",
                { content },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Fetch updated posts
            const response = await axios.get("http://localhost:5000/api/posts/post");
            setPosts(response.data);
            setContent("");
        } catch (error) {
            console.error("Error posting content:", error.response?.data || error.message);
            alert("Failed to create post!");
        }
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
