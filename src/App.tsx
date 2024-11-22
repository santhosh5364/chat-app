import { useState } from "react";
import Login from "./components/Login";
import Chat from "./components/Chat";
import { SocketProvider } from "./context/SocketProvider";

const App = () => {
  const [username, setUsername] = useState<string | null>(null);

  const handleLogin = (username: string) => {
    setUsername(username);
  };

  return (
    <SocketProvider>
      {username ? (
        <Chat username={username} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </SocketProvider>
  );
};

export default App;
