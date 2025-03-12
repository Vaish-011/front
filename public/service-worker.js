self.addEventListener("push", function (event) {
    console.log("Push event received", event);

    let data = {};
    if (event.data) {
        data = event.data.json();
    }

    const options = {
        body: data.body || "You have a new task reminder!",
        icon: "/task-icon.png", 
        badge: "/badge-icon.png",
        vibrate: [200, 100, 200],
        actions: [
            { action: "complete", title: "Mark as Done" },
            { action: "dismiss", title: "Dismiss" }
        ]
    };

    event.waitUntil(
        self.registration.showNotification(data.title || "Task Reminder!", options)
    );
});

self.addEventListener("notificationclick", function (event) {
    event.notification.close();
    if (event.action === "complete") {
        console.log("Task marked as completed");
    } else {
        console.log("Notification dismissed");
    }
});
