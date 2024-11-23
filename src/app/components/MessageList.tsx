import React from "react";
import Message from "./Message";

interface MessageListProps {
  messages: { text: string; userId: string }[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
};

export default MessageList;
