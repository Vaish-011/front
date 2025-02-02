import React, { useState } from "react";
import { BsEmojiSmile, BsPaperclip, BsSend, BsSearch, BsThreeDotsVertical, BsCheck2All } from "react-icons/bs";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState("");

  const contacts = [
    {
      id: 0,
      name: "John Smith",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
      lastMessage: "See you tomorrow!",
      timestamp: "10:30 AM",
      unread: 2,
      online: true
    },
    {
      id: 1,
      name: "Sarah Wilson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      lastMessage: "Thanks for your help!",
      timestamp: "9:45 AM",
      unread: 0,
      online: false
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 0,
      text: "Hi there! How are you?",
      timestamp: "10:00 AM",
      status: "read"
    },
    {
      id: 2,
      sender: "me",
      text: "I'm good, thanks! How about you?",
      timestamp: "10:02 AM",
      status: "read"
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage("");
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#0a192f] text-white">
      {/* Sidebar */}
      <div className="w-1/4 min-w-[300px] bg-transparent border-r border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <div className="relative">
            <input
              type="text"
              placeholder="Search contacts..."
              className="w-full px-4 py-2 bg-[#112240] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-[0_0_10px_rgba(0,0,255,0.5)] transition"
            />
            <BsSearch className="absolute right-3 top-3 text-gray-400" />
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
              <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover" />
              <div className="ml-4 flex-1">
                <h3 className="font-semibold">{contact.name}</h3>
                <p className="text-sm text-gray-400 truncate">{contact.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col bg-transparent text-white">
        <div className="p-4 border-b border-gray-700 flex items-center justify-between bg-[#112240] shadow-md hover:shadow-[0_0_10px_rgba(0,0,255,0.5)] transition">
          <div className="flex items-center">
            <img src={contacts[selectedChat]?.avatar} alt={contacts[selectedChat]?.name} className="w-10 h-10 rounded-full object-cover" />
            <div className="ml-4">
              <h3 className="font-semibold">{contacts[selectedChat]?.name}</h3>
              <p className="text-sm text-gray-400">{contacts[selectedChat]?.online ? "Online" : "Offline"}</p>
            </div>
          </div>
          <BsThreeDotsVertical className="text-gray-400 text-xl cursor-pointer hover:text-white" />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-transparent">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex mb-4 ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] ${msg.sender === "me" ? "bg-[#1e3a8a] text-white" : "bg-[#112240] text-white"} rounded-lg p-3 shadow-md hover:shadow-[0_0_10px_rgba(0,0,255,0.5)] transition`}>
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
            <button onClick={handleSendMessage} className="p-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-blue-600 hover:shadow-[0_0_10px_rgba(0,0,255,0.5)] transition">
              <BsSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
