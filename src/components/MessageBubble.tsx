// src/components/MessageBubble.tsx
import React from "react";

interface Message {
  sender: string;
  content: string;
  timestamp: string;
}

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwnMessage,
}) => {
  return (
    <div
      className={`flex ${
        isOwnMessage ? "justify-end" : "justify-start"
      } space-x-2`}
    >
      {!isOwnMessage && (
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
          {/* User Avatar (could be dynamic) */}
          <span className="text-white font-bold">{message.sender[0]}</span>
        </div>
      )}
      <div
        className={`max-w-[70%] p-3 rounded-lg text-white ${
          isOwnMessage ? "bg-blue-500" : "bg-gray-200 text-gray-800"
        }`}
      >
        <div className="font-semibold">{message.sender}</div>
        <div className="mt-1">{message.content}</div>
        <div className="mt-1 text-xs text-gray-500 text-right">
          {message.timestamp}
        </div>
      </div>
      {isOwnMessage && (
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
          <span>{message.sender[0]}</span>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
