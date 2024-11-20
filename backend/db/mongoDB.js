import mongoose from "mongoose";

const connectToMangoDB=async()=>{
    try{
        await mongoose.connect("mongodb+srv://dheerajsure595:L9l02sP6OG50vvoy@cluster0.ju9lj.mongodb.net/chat-app-db?retryWrites=true&w=majority&appName=Cluster0");
        console.log("connected to mangodb");
    }
    catch(error){
         console.log("error connecting to mangodb",error.message);
    }
}

export default connectToMangoDB;