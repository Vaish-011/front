import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleHomeButtonClick = () => {
    navigate("/home");
  };
  const handlePostButtonClick = () => {
    navigate("/post");
  };
  const handleLoginButtonClick = () => {
    navigate("/login");
  };
  const handleuserButtonClick = () => {
    navigate("/user");
  };
  const handlechatButtonClick = () => {
    navigate("/chat");
  };
  const handleAIresumebuilderButtonClick = () => {
    navigate("/resume");
  };
  const handlecvButtonClick = () => {
    navigate("/cv");
  };
  const handleTasklistButtonClick =()=>{
    navigate("/tasklist");
  }
  const handleFeedbackButtonClick =()=>{
    navigate("/feedback");
  }


  return (
    <div>
      <button onClick={handleHomeButtonClick}>Home Page</button>
      <button onClick={handlePostButtonClick}>Post Page</button>
      <button onClick={handleLoginButtonClick}>Login</button>
      <button onClick={handleuserButtonClick}>userPage</button>
      <button onClick={handlechatButtonClick}>chat Page</button>
      <button onClick={handleAIresumebuilderButtonClick}>AIresumebuilderPage</button>
      <button onClick={handlecvButtonClick}>CVBUILDER PAGE</button>
      <button onClick={handleFeedbackButtonClick}>Feedback Page</button>
      <button onClick={handleTasklistButtonClick}>TasklistPage</button>
    </div>
  );
}

export default HomePage;
