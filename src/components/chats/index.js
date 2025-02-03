import React, { useState, useEffect } from "react";
import { BsEmojiSmile, BsPaperclip, BsSend, BsSearch, BsThreeDotsVertical, BsCheck2All } from "react-icons/bs";
import SearchUsers from "./SearchUsers"; // Importing the SearchUsers component

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null); // Store the selected user's chat
  const [message, setMessage] = useState(""); // Store the current message
  const [contacts, setContacts] = useState([]); // Store the list of contacts
  const [messages, setMessages] = useState([]); // Store messages of the selected chat

//   useEffect(() => {
//     // Fetch contacts from backend (replace with your actual API endpoint)
//     fetch("http://localhost:5000/api/chat/contacts")
//       .then((res) => res.json())
//       .then((data) => setContacts(data))
//       .catch((err) => console.error("Error fetching contacts:", err));
//   }, []);

  useEffect(() => {
    if (selectedChat !== null) {
      // Fetch messages for the selected chat (replace with your actual API endpoint)
      fetch(`http://localhost:5000/api/chat/messages/${selectedChat}`)
        .then((res) => res.json())
        .then((data) => setMessages(data))
        .catch((err) => console.error("Error fetching messages:", err));
    }
  }, [selectedChat]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Send the message (replace with your actual API endpoint)
      fetch(`http://localhost:5000/api/chat/send/${selectedChat}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim() }),
      })
        .then((res) => res.json())
        .then((data) => {
          setMessages((prevMessages) => [...prevMessages, data]); // Add new message to chat
          setMessage(""); // Clear input field
        })
        .catch((err) => console.error("Error sending message:", err));
    }
  };

  const handleSelectUser = (user) => {
    setSelectedChat(user.id); // Set selected chat
  };

  return (
    <div className="flex h-screen w-screen bg-[#0a192f] text-white">
      {/* Sidebar */}
      <div className="w-1/4 min-w-[300px] bg-transparent border-r border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <div className="relative">
            <SearchUsers onSelectUser={handleSelectUser} /> {/* Integrate the SearchUsers component */}
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-80px)]">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedChat(contact.id)}
              className={`flex items-center p-4 cursor-pointer transition 
                ${selectedChat === contact.id ? "bg-[#1e3a8a]" : "hover:bg-[#1a2b5a]"} 
                hover:border hover:border-blue-400 hover:shadow-[0_0_15px_rgba(0,0,255,0.6)] rounded-lg`}
            >
              {/* <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover" /> */}
              <div className="ml-4 flex-1">
                <h3 className="font-semibold">{contact.name}</h3>
                <p className="text-sm text-gray-400 truncate">{contact.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="flex-1 flex flex-col bg-transparent text-white">
        <div className="p-4 border-b border-gray-700 flex items-center justify-between bg-[#112240] shadow-md hover:shadow-[0_0_10px_rgba(0,0,255,0.5)] transition">
          <div className="flex items-center">
          <img
              src={selectedChat ? contacts.find((contact) => contact.id === selectedChat)?.avatar : ""}
              alt={selectedChat ? contacts.find((contact) => contact.id === selectedChat)?.name : ""}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="ml-4">
              <h3 className="font-semibold">
                {selectedChat
                  ? contacts.find((contact) => contact.id === selectedChat)?.name
                  : "Select a chat"}
              </h3>
              <p className="text-sm text-gray-400">
                {selectedChat
                  ? contacts.find((contact) => contact.id === selectedChat)?.online
                    ? "Online"
                    : "Offline"
                  : ""}
              </p>
            </div>
          </div>
          <BsThreeDotsVertical className="text-gray-400 text-xl cursor-pointer hover:text-white" />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-transparent">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex mb-4 ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[70%] ${msg.sender === "me" ? "bg-[#1e3a8a] text-white" : "bg-[#112240] text-white"} rounded-lg p-3 shadow-md hover:shadow-[0_0_10px_rgba(0,0,255,0.5)] transition`}
              >
                <p>{msg.text}</p>
                <div className="flex items-center justify-end mt-1">
                  <span className="text-xs opacity-70">{msg.timestamp}</span>
                  {msg.sender === "me" && <BsCheck2All className="ml-1 text-sm" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 bg-[#112240] border-t border-gray-700">
          <div className="flex items-center space-x-4">
            <BsEmojiSmile className="text-xl text-gray-400 cursor-pointer hover:text-white" />
            <BsPaperclip className="text-xl text-gray-400 cursor-pointer hover:text-white" />
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 bg-[#0a192f] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-[0_0_10px_rgba(0,0,255,0.5)] transition"
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-blue-600 hover:shadow-[0_0_10px_rgba(0,0,255,0.5)] transition"
            >
              <BsSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
