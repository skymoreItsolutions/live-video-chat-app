import User from "../model/userModel.js";
import { verifyToken } from "./jwtcontroller.js";


 export  const userMiddlewere=async(req,res,next)=>{

try {
    const token= await req.cookies.intv;
    if(!token){
        return res.status(204).json({success:false,message:"not auth"})
    }
  const { id }=  verifyToken(token)
  const user= await User.findById(id);
  if(!user){
    return res.status(204).json({success:false,message:"not auth"})

  }
req.user=user;
next()


} catch (error) {
    return res.status(204).json({success:false,message:error.message})

}

 }
