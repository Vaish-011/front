import React, { useState } from "react";

const usersData = [
    { id: 1, name: "John Doe", job: "Software Engineer", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
    { id: 2, name: "Jane Smith", job: "Product Manager", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
    { id: 3, name: "Mike Johnson", job: "Data Analyst", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
    { id: 4, name: "Emily Davis", job: "UX Designer", avatar: "https://randomuser.me/api/portraits/women/4.jpg" },
    { id: 5, name: "Emily Davis", job: "UX Designer", avatar: "https://randomuser.me/api/portraits/women/4.jpg" },
    { id: 6, name: "Emily Davis", job: "UX Designer", avatar: "https://randomuser.me/api/portraits/women/4.jpg" },
    { id: 7, name: "Emily Davis", job: "UX Designer", avatar: "https://randomuser.me/api/portraits/women/4.jpg" },
    { id: 8, name: "Emily Davis", job: "UX Designer", avatar: "https://randomuser.me/api/portraits/women/4.jpg" },
];

function ConnectPage() {
    const [search, setSearch] = useState("");

    const filteredUsers = usersData.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif",width:"100%",position: "absolute",
            top:"0%",
            left:"0"}}>
            <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    marginBottom: "10px"
                }}
            />
            <ul
                style={{
                    listStyle: "none",
                    padding: 0,
                    maxHeight: "800px",
                    overflowY: "auto",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                }}
            >
                {filteredUsers.map((user) => (
                    <li
                        key={user.id}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "10px",
                            borderBottom: "1px solid #ddd",
                            backgroundColor: "#fff",
                            transition: "background-color 0.2s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
                    >
                        <img
                            src={user.avatar}
                            alt={user.name}
                            style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }}
                        />
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: "bold" }}>{user.name}</div>
                            <div style={{ fontSize: "12px", color: "gray" }}>{user.job}</div>
                        </div>
                        <button
                            style={{
                                padding: "5px 10px",
                                borderRadius: "20px",
                                border: "none",
                                backgroundColor: "#0073b1",
                                color: "white",
                                cursor: "pointer",
                            }}
                        >
                            Connect
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ConnectPage;
