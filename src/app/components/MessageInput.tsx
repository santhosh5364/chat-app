import React, { useState } from "react";
import { useSocket } from "../context/SocketContext";
import { getUserId } from "../utlis";

type MessageInputProps = object;

const MessageInput: React.FC<MessageInputProps> = () => {
  const { isServerConnected, socket } = useSocket();
  const [messageText, setMessageText] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(event.target.value);
  };

  const handleSend = () => {
    if (messageText.trim()) {
      socket?.emit("message", messageText);
      setMessageText("");
    }
  };

  return (
    <div className="bg-gray-100 p-4 flex items-center space-x-4 border-t border-gray-300">
      <input
        type="text"
        value={messageText}
        onChange={handleChange}
        placeholder="Type a message..."
        className="flex-1 p-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={!isServerConnected}
      />
      <button
        onClick={handleSend}
        onKeyPress={(e) => e.key === "Enter" && handleSend()}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
        disabled={!isServerConnected}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
