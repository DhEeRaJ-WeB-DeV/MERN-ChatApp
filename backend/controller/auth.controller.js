import bcrypt from "bcryptjs";
import User from "../models/user.models.js";
import generateTokenAndSetCookie from "../utils/generate.Token.js";

export const signup = async (req,res) => {
    try {
        const { fullName, username, password, confirmPassword,gender} = req.body ;
        
        if(password !== confirmPassword){
            return res.status(400).json({error:"Password don't match"});
        }
        const user = await User.findOne({username});

        if(user){
            return res.status(400).json({error:"Username alreday exists"});
        }

        //Hash password here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //Hash Decryption

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic:girlProfilePic,
        });

        if(newUser){
        //Generate JWT token which secures the connection
      
        generateTokenAndSetCookie(newUser._id, res);

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic,
        });
        }
        else{
            return res.status(400).json("Invalid user Data");
        }

    } catch (error) {
        console.log('error in singup controller',error.message);
        return res.status(500).json({error:"intrenal server error"});
    }
}
export const login=async(req,res)=>{

    try{
    const {username, password}=req.body;
    const user= await User.findOne({username});

    const isPasswordCorrect=await bcrypt.compare(password,user?.password || "");

    if(!user || !isPasswordCorrect){
        return res.status(400).json({error:"invalid username or password"});
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        profilePic: user.profilePic,
    });
    }

    catch (error) {
        console.log('error in login controller',error.message);
        return res.status(500).json({error:"intrenal server error"});
    }


};
export const logout=(req,res)=>{
    try {
        res.cookie("jwt","",{ maxAge: 0 })
        return res.status(200).json({message:"logged out successfully"});
    } catch (error) {
        console.log('error in logout controller',error.message);
        return res.status(500).json({error:"intrenal server error"});
    }
};