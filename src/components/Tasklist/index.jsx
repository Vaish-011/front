import React from "react";
import Sidebar from "./Sidebar";
import './sidebar.css';
import Taskhome from './Taskhome'

const Home = () => {
  return (
    <div>
      <Sidebar/>
      <Taskhome/>
    </div>
  );
};

export default Home;
