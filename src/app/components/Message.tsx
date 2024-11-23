import React from "react";
import { getUserId } from "../utlis";

interface MessageProps {
  message: {
    text: string;
    userId: string;
  };
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isSameUser = message.userId === (getUserId() as string);
  return (
    <div className={`flex ${isSameUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`p-3 rounded-lg max-w-xs ${
          isSameUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        <p className="text-sm">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
