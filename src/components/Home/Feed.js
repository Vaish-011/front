import React, { useEffect, useState } from "react";
import BookmarkButton from "../Bookmark/BookmarkButton";
import axios from "axios";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const userId = 1;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts/post/");
        setPosts(res.data.reverse());
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  const toggleReadMore = (postId) => {
    setExpandedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const isExpanded = (postId) => expandedPosts.includes(postId);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div style={styles.feedContainer}>
      {posts.slice(0, visibleCount).map((post) => {
        const contentIsLong = post.content && post.content.length > 150;
        const showFull = isExpanded(post.id);
        const displayedContent =
          showFull || !contentIsLong
            ? post.content
            : post.content.slice(0, 150) + "...";

        return (
          <div key={post.id} style={styles.postCard}>
            <div style={styles.postHeader}>
              <div style={styles.avatar}></div>
              <div>
                <h3 style={styles.postAuthor}>{post.name}</h3>
                <p style={styles.postTime}>
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <p style={styles.postContent}>
              {displayedContent}
              {contentIsLong && (
                <span
                  onClick={() => toggleReadMore(post.id)}
                  style={styles.readMore}
                >
                  {showFull ? " Read Less" : " Read More"}
                </span>
              )}
            </p>

            {post.photo && (
              <a
                href={`http://localhost:5000/uploads/${post.photo}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`http://localhost:5000/${post.photo}`}
                  alt="post"
                  style={styles.postImage}
                />
              </a>
            )}

            {post.video && (
              <video controls style={styles.postVideo}>
                <source
                  src={`http://localhost:5000/${post.video}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            )}

            {post.article && (
              <a
                href={`http://localhost:5000/${post.article}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p style={styles.attachmentLink}>
                  <strong>Article:</strong> {post.article}
                </p>
              </a>
            )}

            {post.event && (
              <a
                href={`http://localhost:5000/${post.event}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p style={styles.attachmentLink}>
                  <strong>Event:</strong> {post.event}
                </p>
              </a>
            )}

            <div style={styles.postActions}>
              <button style={styles.actionButton}>Like</button>
              <button style={styles.actionButton}>Comment</button>
              <button style={styles.actionButton}>Share</button>

              <BookmarkButton
            postId={101}
            userId={userId}
            postTitle={"Post content will be displayed here..."}
            postContent={"Post content will be displayed here..."}
            postAuthor={"Author Name"}
            postTime={"Time Ago"}
          />
            </div>
          </div>
        );
      })}

      {visibleCount < posts.length && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button style={styles.showMoreButton} onClick={handleShowMore}>
            Show More Posts
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  feedContainer: {
    width: "100%",
    maxWidth: "600px",
    margin: "20px auto",
    padding: "0 20px",
    display: "flex",
    flexDirection: "column",
    maxHeight: "80vh",
    overflowY: "auto",
    position: "absolute",
    top: "90px",
  },
  postCard: {
    padding: "20px",
    marginTop: "20px",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "15px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease-in-out",
    width: "100%",
    marginBottom: "20px",
    color: "#e0e0e0",
  },
  postHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  avatar: {
    width: "50px",
    height: "50px",
    background: "gray",
    borderRadius: "50%",
  },
  postAuthor: {
    fontSize: "18px",
    margin: 0,
    color: "#bb86fc",
  },
  postTime: {
    fontSize: "12px",
    color: "#ccc",
    margin: 0,
  },
  postContent: {
    marginTop: "15px",
    lineHeight: "1.5",
    fontSize: "16px",
  },
  readMore: {
    color: "#bb86fc",
    cursor: "pointer",
    fontWeight: "bold",
  },
  postImage: {
    width: "100%",
    maxHeight: "400px",
    objectFit: "cover",
    borderRadius: "10px",
    marginTop: "15px",
  },
  postVideo: {
    width: "100%",
    marginTop: "15px",
    borderRadius: "10px",
  },
  attachmentLink: {
    color: "#e0e0e0",
    marginTop: "10px",
    textDecoration: "underline",
  },
  postActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
    flexWrap: "wrap",
    gap: "10px",
  },
  actionButton: {
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    background: "linear-gradient(145deg, #4a17b0, #095793)",
    color: "white",
    cursor: "pointer",
    transition: "0.3s",
  },
  showMoreButton: {
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    background: "linear-gradient(145deg, #4413a6, #ff4757)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default Feed;
