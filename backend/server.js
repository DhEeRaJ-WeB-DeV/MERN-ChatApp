import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authroutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMangoDB from "./db/mongoDB.js";

const app = express();
const port=process.env.PORT||1080;

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authroutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);


app.listen(port,()=>{
        connectToMangoDB();
        console.log(`server is running at ${port}`)}
);