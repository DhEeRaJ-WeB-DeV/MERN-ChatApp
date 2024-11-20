import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import authroutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMangoDB from "./db/mongoDB.js";
import { app, server } from "./socket/socket.js";


const port=process.env.PORT||1080;

const __dirname=path.resolve();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authroutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(port,()=>{
        connectToMangoDB();
        console.log(`server is running at ${port}`)}
);