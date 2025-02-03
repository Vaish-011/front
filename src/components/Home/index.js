import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import "./styles.css";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        
        const token = localStorage.getItem("token");
        if (!token) {
            // If not, redirect to login page
            navigate("/login");
            
        }
    },[]);

    return (
        <div className="Homepage">
            <Header />
            <div className="app-body">
                <Sidebar />
                <Feed />
                <Widgets />
            </div>
        </div>
    );
};

export default Home;
