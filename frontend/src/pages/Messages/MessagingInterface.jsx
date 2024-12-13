import React, { useState } from "react";
import { FiSend } from "react-icons/fi";

const MessagingInterface = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "Sofia", text: "Hi, how can I help you today?", type: "received" },
    { id: 2, sender: "User", text: "Hey, I'm having trouble with my account.", type: "sent" },
    { id: 3, sender: "Sofia", text: "What seems to be the problem?", type: "received" },
    { id: 4, sender: "User", text: "I can't log in.", type: "sent" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, sender: "User", text: newMessage, type: "sent" },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col w-full h-full mx-auto  rounded-lg">
      {/* Header */}
      <div className="flex items-center h-20 gap-4 p-4 border-b">
        <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">S</span>
        </div>
        <div className="flex flex-col">
          <h2 className="font-semibold">Sofia Davis</h2>
          <p className="text-sm text-gray-400">m@example.com</p>
        </div>
        <button className="ml-auto text-gray-400 hover:text-white">
          <span className="text-lg font-bold">+</span>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.type === "sent" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.type === "sent"
                  ? "bg-white text-black border"
                  : "bg-gray-700 text-white"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <form
        className="flex items-center p-4 "
        onSubmit={sendMessage}
      >
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-2 outline-none"
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-gray-600 rounded-full hover:bg-gray-500"
        >
          <FiSend className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default MessagingInterface;
