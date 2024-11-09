import User from "../models/user.models.js";

export const getUserForSidebar=async(req,res)=>{
    try {

        const loggedInUserId=req.user._id;
        
        const fileredUsers= await User.find({_id:{$ne:loggedInUserId}}).select("-password");

        res.status(200).json(fileredUsers);

    } catch (error) {
        console.error('error in getUserForSidebar',error.message);
        return res.status(500).json({error:"internal server error"});
    }
};