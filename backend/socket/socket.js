import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
	},
});

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];//it looks up the userSocketMap object using receiverId as the key.
//The value returned is the socket ID of the specified user, or undefined if the receiverId doesn't exist in the map.
};

const userSocketMap = {}; // {userId: socketId}

//on connection to the io server where "socket" is clint(loggedin user) and "io" is the server
io.on("connection", (socket) => {
	console.log("a user connected", socket.id);

    //to get the authenticated userId from the socket
    const userId = socket.handshake.query.userId;//socket.handshake provides all the information about the initial connection request, including details such as the query parameters, headers, cookies, and protocols involved.
	
    if (userId != "undefined") userSocketMap[userId] = socket.id;//The idea is to store each connected user's socketId in the userSocketMap under their userId. This allows the server to keep track of which socket is associated with which user.

    // io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));//emits the userId that is associated with the socketId to all the connected clients to show that they are online

	// socket.on() is used to listen to the events. can be used both on client and server side
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId]; //deletes the userId from the userSocketMap when the user disconnects
		io.emit("getOnlineUsers", Object.keys(userSocketMap));//then emits the updated online users[obj] to all the connected clients
	});
});

export { app, io, server };