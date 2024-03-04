// Import the express module and assign it to the variable 'express'
const express = require("express");
// Create an instance of the express application and assign it to the variable 'app'
const app = express();
// Import the http module, create an HTTP server using the express app, and assign it to the variable 'http'
const http = require("http").Server(app);
// Import the socket.io module and pass the HTTP server to it to create a WebSocket server, and assign it to the variable 'io'
const io = require("socket.io")(http);

// Define a function called 'broadcast' that takes a 'data' parameter and emits a 'message' event to all connected sockets with the 'data' as the payload
// function broadcast(data) {
//   io.sockets.emit("message", data);
// }


 // Listen for a 'connection' event on the 'io' WebSocket server
io.on("connection", function (socket) {
    console.log('A new client has connected to the server');

    socket.on("message", (data ,userId) => {
        console.log(`Message :${data}` ,`User id :${userId}`);

        io.emit('message', {message: data, sender :userId});
    });
});

// Serve static files from the current directory (the directory where the script is located)
app.use(express.static('views'));
app.use(express.static('public'));

// Start the HTTP server and make it listen on port 8080
http.listen(3001, () => {
  console.log('Server is listening on port 3001');
})