import React, { useState } from "react";

interface UserEntryProps {
  onEntry: (username: string) => void;
}

const UserEntry: React.FC<UserEntryProps> = ({ onEntry }) => {
  const [username, setUsername] = useState("");

  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUsername(value);
  };

  const handleEnter = () => {
    if (username.trim()) {
      onEntry(username);
    } else {
      alert("Please enter username");
    }
  };

  return (
    <div className="bg-gray-100 p-4 flex items-center space-x-4 border-t border-gray-300">
      <input
        type="text"
        value={username}
        onChange={handleChangeUserName}
        placeholder="Type a User Name..."
        className="flex-1 p-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleEnter}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
      >
        Enter Chat
      </button>
    </div>
  );
};

export default UserEntry;
