import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";
import axios from "axios";

const socket = io("http://localhost:5000");

const MessengeInterface = ({ userId }) => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetchUsers();
    socket.on("message", (message) => {
      if (message.senderId === selectedUser?._id || message.receiverId === selectedUser?._id) {
        setMessages((prev) => [...prev, message]);
      }
    });
  }, [selectedUser]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const fetchMessages = async (receiverId) => {
    setSelectedUser(users.find((user) => user._id === receiverId));
    try {
      const res = await axios.get(`http://localhost:5000/api/messages/${receiverId}`);
      setMessages(res.data);
    } catch (error) {
      console.error("Error fetching messages", error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    const messageData = { senderId: userId, receiverId: selectedUser._id, text: newMessage };
    socket.emit("sendMessage", messageData);
    setMessages([...messages, messageData]);
    setNewMessage("");
  };

  return (
    <div className="flex h-screen">
      {/* Users List */}
      <div className="w-1/3 border-r p-4">
        <h2 className="text-xl font-bold mb-4">Chats</h2>
        {users.map((user) => (
          <button key={user._id} onClick={() => fetchMessages(user._id)} className="block w-full p-2 border-b text-left">
            {user.name}
          </button>
        ))}
      </div>

      {/* Chat Window */}
      <div className="w-2/3 flex flex-col">
        {selectedUser ? (
          <>
            <div className="border-b p-4 font-bold">Chat with {selectedUser.name}</div>
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((msg, index) => (
                <div key={index} className={`mb-2 p-2 rounded-md ${msg.senderId === userId ? "bg-blue-500 text-white ml-auto" : "bg-gray-300 text-black"}`}>{msg.text}</div>
              ))}
            </div>
            <div className="p-4 border-t flex">
              <input type="text" className="flex-1 p-2 border" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." />
              <button className="ml-2 p-2 bg-blue-500 text-white" onClick={sendMessage}>Send</button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 text-gray-500">Select a chat</div>
        )}
      </div>
    </div>
  );
};

export default MessengeInterface;
