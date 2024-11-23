const http = require("http");
const socketIo = require("socket.io");

// Create an HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("WebSocket Server");
});

// Initialize socket.io with the server
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Allow React client
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

// In-memory storage for messages and connected users
let messages = []; // This stores all the messages
let users = []; // This tracks connected users

// Handle new socket connections
io.on("connection", (socket) => {
  console.log("A user connected");

  // Add user to the list of connected users
  users.push(socket.id);
  console.log("Connected users:", users);

  // Send the list of users to the newly connected client
  socket.emit("userList", users);

  // Send all stored messages to the newly connected client
  socket.emit("messageHistory", messages);

  // Listen for new messages from clients
  socket.on("message", (msg) => {
    console.log("Message from client: ", msg);

    // Save the message on the server
    messages.push({ text: msg, userId: socket.id });

    // Broadcast the new message to all connected clients
    io.emit("message", msg);
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");

    // Remove user from the connected users list
    users = users.filter((userId) => userId !== socket.id);
    console.log("Connected users:", users);

    // Broadcast updated list of users to all clients
    io.emit("userList", users);
  });

  // Handle connection errors
  socket.on("connect_error", (err) => {
    console.log("Connection Error: ", err);
  });
});

// Start the server and listen on port 3001
server.listen(3001, () => {
  console.log("WebSocket server is running on http://localhost:3001");
});
