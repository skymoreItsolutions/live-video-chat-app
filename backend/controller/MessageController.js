import Friend from "../model/friendsmodel.js";
import Message from "../model/messageModel.js";


export const sendMessage=async(req,res)=>{
try {
    const {sender,message,friend}=req.body;
    if(!sender || !message || !friend){
        return res.status(200).json({success:false,message:"enter all data"})
 
    }

const msg= await Message.create({sender,message,friend});
    return res.status(200).json({success:true,msg})



    
} catch (error) {
    
}
}

export const getallmessage=async(req,res)=>{
    try {
        const {sender,receiver} =req.body;

        const messageroom= await Friend.findOne({ $or: [
            { sender, receiver }, 
            { sender: receiver, receiver: sender } 
          ],
          status: "accepted"}).select("_id")


return res.status(200).json({success:true,messageroom})

    } catch (error) {
        
    }
}


export  const messages=async (req,res)=>{
    try {


const {messageroom}=req.params;
        const allmessae= await Message.find({friend:messageroom})
if(!allmessae.length){
    return res.status(200).json({success:false,message:"No message"})

}

return res.status(200).json({success:true,allmessae})
        
    } catch (error) {
        
    }
}



