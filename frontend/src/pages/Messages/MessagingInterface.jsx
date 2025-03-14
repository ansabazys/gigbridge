import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";  // Use the hook to get params
import { io } from "socket.io-client";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const socket = io("http://localhost:5000"); // Connect to Socket.io server

const MessengeInterface = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const { user1, user2 } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { _id } = user;

  useEffect(() => {
    fetchUsers();
    if (user1 && user2) {
      fetchMessages(user1, user2);
    }

    // **Listen for new messages in real-time & prevent duplicates**
    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => {
        if (!prevMessages.some((msg) => msg._id === message._id)) {
          return [...prevMessages, message];
        }
        return prevMessages;
      });
    });

    return () => {
      socket.off("newMessage"); // Cleanup listener
    };
  }, [user1, user2]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user");
      setSelectedUser(res.data.find((user) => user._id === user1));
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const fetchMessages = async (user1, user2) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/messages/${user1}/${user2}`);
      setMessages(res.data);
    } catch (error) {
      console.error("Error fetching messages", error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      senderId: _id, // Current user
      receiverId: selectedUser._id,
      message: newMessage,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/messages", messageData);
      socket.emit("sendMessage", response.data); // **Send message via Socket.io**
      setNewMessage(""); // Clear input field
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  return (
    <div className="flex h-full">
      {/* Users List */}
      <div className="w-1/3 border-r p-4">
        <h2 className="text-xl font-bold mb-4">Chats</h2>
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => navigate(`/home/messages/${user._id}/${_id}`)}
            className="block w-full p-2 border-b text-left"
          >
            {user.fname}
          </button>
        ))}
      </div>

      {/* Chat Window */}
      <div className="w-2/3 flex flex-col h-full">
        {selectedUser ? (
          <div className="bg-slate-100 h-full flex flex-col">
            <div className="p-4 font-bold">Chat with {selectedUser.fname}</div>
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded-lg max-w-xs break-words ${
                    msg.senderId === _id
                      ? "bg-blue-500 text-white ml-auto text-right"
                      : "bg-gray-300 text-black mr-auto text-left"
                  }`}
                >
                  {msg.message}
                </div>
              ))}
            </div>
            {/* Input and Button at the Bottom */}
            <div className="p-4 border-t flex justify-between items-center">
              <input
                type="text"
                className="flex-1 p-2 border"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button className="ml-2 p-2 bg-blue-500 text-white" onClick={sendMessage}>
                Send
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center flex-1 text-gray-500">
            Select a chat
          </div>
        )}
      </div>
    </div>
  );
};

export default MessengeInterface;
