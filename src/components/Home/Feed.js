import React from "react";
import "./styles.css";

function Feed() {
  return (
    <div className="feed feed-3d">
      <div className="post-box post-box-3d">
        <input type="text" placeholder="Start a post..." className="input-3d" />
        <button className="btn-3d">Post</button>
      </div>
      <div className="post post-3d">
        <h3 className="text-3d">Raj Shah</h3>
        <p className="text-3d">Starting a new role at Fintech Global Center!</p>
      </div>
    </div>
  );
}

export default Feed;

