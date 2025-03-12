import React, { useState, useEffect } from "react";
import "./notification.css";

function NotificationComponent() {
    const [notifications, setNotifications] = useState([]);
    const [notifiedTasks, setNotifiedTasks] = useState(new Set());
    const [permissionGranted, setPermissionGranted] = useState(Notification.permission === "granted");

    useEffect(() => {
        if ("serviceWorker" in navigator && "PushManager" in window) {
            navigator.serviceWorker.register("/service-worker.js")
                .then(reg => console.log("Service Worker Registered:", reg))
                .catch(err => console.error("Service Worker Registration Failed:", err));
        }
    }, []);

    const requestNotificationPermission = async () => {
        try {
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
                console.log("🔔 Notification permission granted!");
                setPermissionGranted(true);
            } else {
                console.warn("⚠ Notification permission denied.");
            }
        } catch (error) {
            console.error("Error requesting notification permission:", error);
        }
    };

    useEffect(() => {
        if (!("Notification" in window)) {
            console.error("This browser does not support notifications.");
            return;
        }

        if (permissionGranted) {
            fetchNotifications();
            const interval = setInterval(fetchNotifications, 60000); // Fetch every 1 min
            return () => clearInterval(interval);
        }
    }, [permissionGranted]);

    const fetchNotifications = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/tasks/task/notifications");
            if (!response.ok) throw new Error("Failed to fetch notifications");

            const data = await response.json();
            console.log("Fetched Notifications:", data);

            const currentTime = new Date();

            data.forEach((task) => {
                const taskTime = new Date(`${task.task_date}T${task.task_time}`);

                if (taskTime <= currentTime && !notifiedTasks.has(task.id)) {
                    sendNotification(task);

                    setNotifiedTasks((prevSet) => new Set(prevSet).add(task.id));
                }
            });

            setNotifications(data);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    const sendNotification = async (task) => {
        console.log("🔔 Attempting to send notification...");

        if (Notification.permission === "granted" && "serviceWorker" in navigator) {
            const registration = await navigator.serviceWorker.ready;

            registration.showNotification("Task Reminder! 📌", {
                body: `Task: ${task.task_name}\nTime: ${task.task_time}\n✅ Stay productive!`,
                icon: "https://cdn-icons-png.flaticon.com/512/1827/1827272.png"
            });

            console.log(`Notification shown for task: ${task.task_name}`);
        } else {
            console.warn("⚠ Notification permission not granted.");
        }
    };

    return (
        <div className="notifications-container">
            <h2>Notifications</h2>
            {!permissionGranted && (
                <button onClick={requestNotificationPermission}>Enable Notifications 🔔</button>
            )}
            <div className="notification-list">
                {notifications.length > 0 ? (
                    notifications.map((task) => (
                        <div key={task.id} className="notification-item">
                            <p><strong>{task.task_name}</strong></p>
                            <p>{new Date(task.task_date).toLocaleDateString()} | {task.task_time}</p>
                        </div>
                    ))
                ) : (
                    <p>No new notifications.</p>
                )}
            </div>
        </div>
    );
}

export default NotificationComponent;
