import { useState, useEffect } from "react";
import { useSocket } from "../context/SocketProvider";

const Chat = ({ username }: { username: string }) => {
  const socket = useSocket();
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (socket) {
      socket.on("new-message", (message: string) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [socket]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      socket?.emit("send-message", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 p-4 overflow-y-auto bg-gray-200">
        {messages.map((message, index) => (
          <div
            key={index}
            className={username === "Main User" ? "text-right" : "text-left"}
          >
            <p className="bg-blue-200 p-2 rounded mb-2">{message}</p>
          </div>
        ))}
      </div>

      <div className="flex p-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border"
          placeholder="Type your message"
        />
        <button
          onClick={sendMessage}
          className="ml-2 p-2 bg-blue-500 text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
