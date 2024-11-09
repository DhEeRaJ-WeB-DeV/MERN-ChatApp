import mongoose from "mongoose";

const connectToMangoDB=async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/");
        console.log("connected to mangodb");
    }
    catch(error){
         console.log("error connecting to mangodb",error.message);
    }
}

export default connectToMangoDB;