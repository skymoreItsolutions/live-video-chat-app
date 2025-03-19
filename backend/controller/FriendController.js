import { verifyToken } from "../helper/jwtcontroller.js";
import Friend from "../model/friendsmodel.js";
import User from "../model/userModel.js";



export const sendRequest=async(req,res)=>{

    try {
         const {receiver,sender} =req.body; 
     if(!sender || !receiver){
            res.status(200).json({success:false,message:"Invalid request"})
        }

const pandingallready= await Friend.findOne({$and:[{sender},{receiver},{ $or:[ {status:"pending"}]}]})
if(pandingallready){
  return  res.status(200).json({success:false,message:"request Sent allready"})

}
const acceptedallready= await Friend.findOne({$and:[{sender},{receiver},{status:"accepted"}]})

if(acceptedallready){
   return  res.status(200).json({success:false,message:"Allready Friends"})
}


     const friendCreate= await Friend.create({sender,receiver})
 
 const send_friend =   await User.findById({_id:receiver})
 await  send_friend.updateOne({$addToSet:{friendreq:sender}})


 return    res.status(201).json({success:true ,message:"Request sent",friendCreate})


    } catch (error) {
      return    res.status(200).json({success:false ,message:error.message,})

    }
}


export const unsendRequest=async(req,res)=>{
try {
  const {receiver,sender} =req.body; 
  if(!sender || !receiver){
         res.status(200).json({success:false,message:"Invalid request"})
     }


  
} catch (error) {
  
}


}



export const getFriendListController=async(req,res)=>{
  try {
    const {token}=req.params;
  const {id}= await  verifyToken(token)

  const getuser= await User.findById({_id:id}).populate("friends");

  
 return    res.status(200).json({success:true ,message:"Request sent",getuser})
  

    
  } catch (error) {
    res.status(200).json({success:false ,message:error.message})
  }
}

export const getrequestFriendListController=async(req,res)=>{
  try {
    const {token}=req.params;
  const {id}= await  verifyToken(token)

  const getuser= await User.findById({_id:id}).populate("friendreq");

  
 return    res.status(200).json({success:true ,message:"Request sent",getuser})
  

    
  } catch (error) {
    res.status(200).json({success:false ,message:error.message})
  }
}


























export const acceptRequest = async (req, res) => {
    try {
      const { sender ,receiver} = req.body;
     
      if (!sender || !receiver) {
        return res.status(400).json({ success: false, message: "Invalid request" });
      }
  
      const pendingRequest = await Friend.findOneAndUpdate({ sender, receiver, status: "pending" },{ status: "accepted" });
      
      if (!pendingRequest) {
        return res.status(404).json({ success: false, message: "No pending request found" });
      }
  
    
  
      const senderUser = await User.findById(sender);
      const receiverUser = await User.findById(receiver);
  
      if (!senderUser || !receiverUser) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      await senderUser.updateOne({ $addToSet: { friends: receiverUser._id } });
      await receiverUser.updateOne({ $addToSet: { friends: senderUser._id } });
      await receiverUser.updateOne({ $pull: { friendreq: senderUser._id } });
      return res.status(200).json({ success: true, message: "Request accepted successfully" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };






export const rejectRequest=async(req,res)=>{
    try {
        const {sender} =req.body;
        const  receiver=req.user._id;
        if(!sender || !receiver){
         return   res.status(400).json({success:false,message:"Invalid request"})
        }
         await Friend.findOneAndDelete({$and:[{sender},{receiver},{status:"pending"}]})
        
                            
     return res.status(201).json({success:true,message:" Delete request"})
     
    
    
    } catch (error) {
        return   res.status(400).json({success:false,message:error.message})
    
    }
    
    } 




  

  
    
   export const FindFriend=async(req,res)=>{
    try {
       const {name,token}=req.body;
      if(!name || !token){
        return res.status(300).json({success:false,message:"enter valid data"})
      }

   const {id}=   verifyToken(token)

   const getUser= await User.findById({_id:id})
    const serachfriend= await  User.find({
      $and: [
      {
        $or: [
          { name: { $regex: name, $options: "i" } }, // Case-insensitive search in 'name'
          { user_name: { $regex: name, $options: "i" } } // Case-insensitive search in 'user_name'
        ]
      },
      { _id: { $ne: getUser._id } } // Exclude the current user
    ]
  });
  return res.status(200).json({success:true,message:"enter valid data",serachfriend})

      
    } catch (error) {
      return res.status(300).json({success:false,message:error.message})

    }
   } 