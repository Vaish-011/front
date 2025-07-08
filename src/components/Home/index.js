import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import JobListWidget from "./JobListWidget";
import "./styles.css";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            
        }
    },[]);

    return (
        <div className="Homepage">
            <Header />
            <div className="app-body">
                <Sidebar />
                <Feed />
                <JobListWidget />
            </div>
        </div>
    );
};

export default Home;
