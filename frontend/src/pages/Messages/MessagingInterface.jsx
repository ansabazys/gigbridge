import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";  // Use the hook to get params
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

const MessengeInterface = ({ userId }) => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  // Extract user1 and user2 from the URL params
  const { user1, user2 } = useParams();

  useEffect(() => {
    fetchUsers();
    if (user1 && user2) {
      fetchMessages(user1, user2); // Fetch messages between user1 and user2
    }

    socket.on("message", (message) => {
      if (
        (message.senderId === user1 && message.receiverId === user2) ||
        (message.senderId === user2 && message.receiverId === user1)
      ) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off("message"); // Clean up on unmount
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
      senderId: userId,
      receiverId: selectedUser._id,
      message: newMessage,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/messages", messageData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setMessages([...messages, response.data]); // Update message state on success
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
            onClick={() => fetchMessages(user._id, userId)}
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
                  className={`mb-2 p-2 rounded-md w-fit ${
                    msg.senderId === userId
                      ? "bg-blue-500 text-white ml-auto"
                      : "bg-gray-300 text-black"
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
              <button
                className="ml-2 p-2 bg-blue-500 text-white"
                onClick={sendMessage}
              >
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
