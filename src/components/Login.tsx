import { useState } from "react";

const Login = ({ onLogin }: { onLogin: (username: string) => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username && password) {
      onLogin(username); // send username to the server
    } else {
      alert("Please enter both username and password.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-xl rounded-lg">
        <h2 className="text-xl mb-4">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 p-2 border"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 border"
        />
        <button onClick={handleLogin} className="p-2 bg-blue-500 text-white">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
