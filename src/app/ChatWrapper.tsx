import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";
import { useSocket } from "./context/SocketContext";
import UserEntry from "./components/UserEntry";
import { getUserName, setUserName } from "./utlis";
import { useMemo } from "react";

const ChatWrapper = () => {
  const { messages, userList, isServerConnected, socket } = useSocket();

  console.log("isServerConnected", isServerConnected);

  console.log(userList, socket);

  return useMemo(() => {
    const handleAddedNewUser = (userName: string) => {
      setUserName(userName);
      socket?.emit("register", userName);
    };

    if (!getUserName()) {
      return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-600 text-white text-center py-3">
              <h2 className="text-xl font-semibold">Group Chat</h2>
              {userList.length > 0 && <p>Online Users: {userList.length}</p>}
            </div>
            <UserEntry onEntry={handleAddedNewUser} />
          </div>
        </div>
      );
    }
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-blue-600 text-white text-center py-3">
            <h2 className="text-xl font-semibold">Group Chat</h2>
            {userList.length > 0 && <p>Connected users: {userList.length}</p>}
          </div>

          <MessageList messages={messages} />

          <MessageInput />
        </div>
      </div>
    );
  }, [messages, userList.length]);
};

export default ChatWrapper;
