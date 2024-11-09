import Conversation from "../models/conversation.models.js";
import Message from "../models/message.models.js";

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

  await Promise.all([conversation.save(),newMessage.save()]);
 
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