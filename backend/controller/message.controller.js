import Conversation from "../models/conversation.models.js";
import Message from "../models/message.models.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendmessage=async(req,res)=>{
 try {
  const {message}=req.body;
  const {id:receiverId}=req.params;
  const senderId= req.user._id;


  let conversation=await Conversation.findOne({
    participants:{$all:[senderId,receiverId]}, //find a coversation where a participants array includes these fields sender and receiver
  })// gives conversation bw these two users

  if(!conversation){
    conversation=await Conversation.create({
      participants:[senderId,receiverId],//if there r sending a message for 1st time to create a new conversation.it will be null
    })
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    message,
  });

  if(newMessage){
    conversation.messages.push(newMessage._id);
  }
    // await conversation.save();
		// await newMessage.save();

		// this will run in parallel
  await Promise.all([conversation.save(),newMessage.save()]);

  // SOCKET IO FUNCTIONALITY WILL GO HERE
  const receiverSocketId = getReceiverSocketId(receiverId);//get the socket id of the receiver
  if (receiverSocketId) {//if online 
    // io.to(<socket_id>).emit() used to send events to specific client
    io.to(receiverSocketId).emit("newMessage", newMessage);//sends a message to the specified socket(user)
  }
 
   res.status(201).json(newMessage);

 } 
 catch (error) {
  console.log('error in sendmessage controller',error.message);
  return res.status(500).json({error:"internal server error"});
 }
};

export const getmessage=async(req,res)=>{
 try {
    
    const { id:userToChatId }=req.params;
    const senderId=req.user._id;

    let conversation=await Conversation.findOne({
      participants:{$all:[senderId,userToChatId]}, //find a coversation 
    }).populate("messages");//it gives the Message contents or schema from the objectId
  
    if(!conversation){
     return res.status(200).json([]);
    }

    return res.status(200).json(conversation.messages);

 } catch (error) {
  console.log('error in getmessage controller',error.message);
  return res.status(500).json({error:"internal server error"});
 }
};