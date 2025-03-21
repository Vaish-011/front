import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "./stylesnotification.css"; // Ensure it matches LinkedIn style

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState("");

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            setUser(storedUser);
            setToken(storedToken);
        }
    }, []);

    // Only proceed if user is not null
    useEffect(() => {
        if (!user) return;

        const fetchNotifications = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/notifications/notifications/${user.id}`);
                setNotifications(res.data);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, [user]); // Depend on user instead of userId

    return (
        <div className="notifications-page">
            <div className="notification-wrapper">
                <h1 className="notifications-header">Notifications</h1>
                <div className="notifications-container">
                    {notifications.length === 0 ? (
                        <p>No notifications yet</p>
                    ) : (
                        <ul>
                            {notifications.map((notif, index) => (
                                <li key={index} className={notif.read ? "read" : "unread"}>
                                    <div className="notif-card">
                                        <p>{notif.message}</p>
                                        <span>{moment(notif.createdAt).fromNow()}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notifications;
