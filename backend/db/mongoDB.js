import mongoose from "mongoose";

const connectToMangoDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("connected to mangodb");
    }
    catch(error){
         console.log("error connecting to mangodb",error.message);
    }
}

export default connectToMangoDB;