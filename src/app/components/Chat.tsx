import React, { useState, useEffect } from "react";
import { useSocket } from "../context/SocketContext";

interface Message {
  sender: string;
  content: string;
  timestamp: string;
}

interface ChatProps {
  username: string;
  isJoined: boolean;
  messages: Message[];
  onJoinChat: (username: string) => void;
  onSendMessage: (message: string) => void;
}

const Chat: React.FC<ChatProps> = ({
  username,
  isJoined,
  messages,
  onJoinChat,
  onSendMessage,
}) => {
  const [messageInput, setMessageInput] = useState<string>("");
  const [localUsername, setLocalUsername] = useState<string>("");
  const socket = useSocket();

  useEffect(() => {
    if (socket && isJoined && username) {
      socket.emit("join-chat", username);
    }

    return () => {
      if (socket) {
        socket.off("new-message");
      }
    };
  }, [socket, isJoined, username]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      onSendMessage(messageInput);
      socket.emit("send-message", { sender: username, content: messageInput });
      setMessageInput("");
    }
  };

  const handleJoinChat = () => {
    if (localUsername.trim()) {
      socket.emit("join-chat", localUsername);
      onJoinChat(localUsername);
    } else {
      alert("Please enter a username");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Chat Header */}
        <div className="bg-blue-600 text-white p-4 text-center text-lg font-semibold">
          {isJoined ? `Welcome, ${username}!` : "Please Enter Your Username"}
        </div>

        {/* Chat messages */}
        <div className="p-4 space-y-4 overflow-y-auto h-96">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                msg.sender === username
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              <div className="font-semibold">{msg.sender}</div>
              <div>{msg.content}</div>
              <div className="text-xs text-gray-500">{msg.timestamp}</div>
            </div>
          ))}
        </div>

        {/* Message input */}
        {isJoined ? (
          <div className="bg-gray-50 p-4 flex items-center space-x-4 border-t">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Send
            </button>
          </div>
        ) : (
          <div className="bg-gray-50 p-4 flex items-center space-x-4 border-t">
            <input
              type="text"
              value={localUsername}
              onChange={(e) => setLocalUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username..."
            />
            <button
              onClick={handleJoinChat}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Join Chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
