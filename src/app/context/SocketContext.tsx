import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";
import { setUserId } from "../utlis";

type Message = {
  text: string;
  userId: string;
};

interface ContextProps {
  socket: Socket | null;
  messages: Array<Message>;
  userList: Array<unknown>;
  isServerConnected: boolean;
}

const SocketContext = createContext<ContextProps>({
  socket: null,
  messages: [],
  userList: [],
  isServerConnected: false,
});

const SOCKET_URL = "http://localhost:3001";

export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Array<Message>>([]); // To store messages from the server
  const [userList, setUserList] = useState<Array<unknown>>([]);
  const [isServerConnected, setIsServerConnected] = useState<boolean>(false);

  useEffect(() => {
    // Connect to the WebSocket server
    const socket = io(SOCKET_URL, {
      transports: ["websocket"], // Force WebSocket as transport
    });

    // Event when connected
    socket.on("connect", () => {
      if (socket.id) {
        setUserId(socket.id);
      }
      setIsServerConnected(true);
    });

    // Event when disconnected
    socket.on("disconnect", () => {
      setIsServerConnected(false);
    });

    // Log connection errors
    socket.on("connect_error", (err) => {
      alert("Connection Error: " + err);
    });

    socket.on("userList", (users) => {
      setUserList(users);
    });

    socket.on("messageHistory", (history) => {
      setMessages(history);
    });

    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  const value = { isServerConnected, socket, messages, userList };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
