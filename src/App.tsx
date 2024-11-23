import React from "react";
import ChatWrapper from "./app/ChatWrapper";
import { SocketProvider } from "./app/context/SocketContext";

const App: React.FC = () => (
  <SocketProvider>
    <ChatWrapper />
  </SocketProvider>
);

export default App;
