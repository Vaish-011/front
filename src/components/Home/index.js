import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import "./styles.css";

const home = ()=>{
    return(
       
        <div className="Homepage">
          <Header />
          <div className="app-body">
          <Sidebar />
          <Feed/>
          <Widgets />
          </div>
        </div>
    )
};
export default home;