import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/chat";

const Chat = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [chatList, setChatList] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");

    // Load user from localStorage
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    // Load chat list from localStorage and fetch from API if needed
    useEffect(() => {
        if (user) {
            const storedChats = JSON.parse(localStorage.getItem("chatList"));
            if (storedChats) {
                setChatList(storedChats);
            } else {
                fetchChatList();
            }
        }
    }, [user]);

    // Update localStorage when chatList changes
    useEffect(() => {
        if (chatList.length > 0) {
            localStorage.setItem("chatList", JSON.stringify(chatList));
        }
    }, [chatList]);

    // Fetch chat list from API
    const fetchChatList = async () => {
        try {
            const response = await axios.get(`${API_URL}/getChats/${user.id}`);
            setChatList(response.data);
            localStorage.setItem("chatList", JSON.stringify(response.data));
        } catch (error) {
            console.error("Error fetching chat list:", error);
        }
    };

    // Fetch search results
    useEffect(() => {
        if (searchQuery.length >= 2) {
            fetchSearchResults();
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    const fetchSearchResults = async () => {
        try {
            const response = await axios.post(`${API_URL}/search`, { query: searchQuery });
            setSearchResults(response.data);
        } catch (error) {
            console.error("Error searching users:", error);
        }
    };

    // Start a new chat
    const handleStartChat = async (recipient) => {
        try {
            const response = await axios.post(`${API_URL}/addChat`, {
                user_id: user.id,
                contact_id: recipient.id,
            });

            const newChat = {
                id: response.data.chat_id,
                name: recipient.name,
                recipientId: recipient.id,
            };

            setChatList((prev) => [...prev, newChat]);
            setSelectedChat(newChat);
            fetchMessages(newChat.id);
        } catch (error) {
            console.error("Error starting chat:", error);
        }
    };

    // Fetch messages
    const fetchMessages = async (chatId) => {
        try {
            const response = await axios.get(`${API_URL}/getMessages/${chatId}`);
            setMessages(response.data);
            const chat = chatList.find((c) => c.id === chatId);
            if (chat) {
                setSelectedChat(chat);
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    // Send a message
    const handleSendMessage = async () => {
        if (!selectedChat || !messageInput.trim()) return;

        const newMessage = {
            id: Date.now(),
            senderId: user.id,
            recipientId: selectedChat.recipientId,
            message: messageInput,
            createdAt: new Date().toISOString(),
        };
        
        setMessages((prev) => [...prev, newMessage]);
        setMessageInput("");

        try {
            const response = await axios.post(`${API_URL}/sendMessage`, {
                chat_id: selectedChat.id,
                senderId: user.id,
                recipientId: selectedChat.recipientId,
                message: messageInput,
            });

            setMessages((prev) => prev.map(msg => (msg.id === newMessage.id ? response.data : msg)));
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-1/3 bg-white shadow-lg p-4">
                <h2 className="text-lg font-semibold">Chat List</h2>
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 border rounded mt-2"
                />
                <ul className="mt-2">
                    {searchResults.map((result) => (
                        <li key={result.id} onClick={() => handleStartChat(result)}
                            className="p-2 hover:bg-gray-200 cursor-pointer rounded">
                            {result.name}
                        </li>
                    ))}
                </ul>
                <h3 className="text-lg font-semibold mt-4">Saved Chats</h3>
                <ul>
                    {chatList.map((chat) => (
                        <li key={chat.id} onClick={() => fetchMessages(chat.id)}
                            className="p-2 hover:bg-gray-200 cursor-pointer rounded">
                            {chat.name}
                        </li>
                    ))}
                </ul>
            </div>
            {/* Chat Window */}
            <div className="w-2/3 p-4 flex flex-col">
                {selectedChat ? (
                    <>
                        <h2 className="text-xl font-semibold">Chat with {selectedChat.name}</h2>
                        <div className="flex-1 bg-white p-4 border rounded overflow-y-auto h-96">
                            {messages.length > 0 ? (
                                messages.map((msg, index) => (
                                    <div key={index} className={`p-2 rounded mb-2 ${msg.senderId === user.id ? "bg-green-200 self-end" : "bg-gray-200 self-start"}`}>
                                        <b>{msg.senderId === user.id ? "You" : selectedChat.name}:</b> {msg.message}
                                    </div>
                                ))
                            ) : (
                                <p>No messages yet</p>
                            )}
                        </div>
                        <div className="flex mt-4">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                className="flex-1 p-2 border rounded"
                            />
                            <button onClick={handleSendMessage} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
                                Send
                            </button>
                        </div>
                    </>
                ) : (
                    <h2 className="text-xl font-semibold">Select a chat to start messaging</h2>
                )}
            </div>
        </div>
    );
};

export default Chat;
