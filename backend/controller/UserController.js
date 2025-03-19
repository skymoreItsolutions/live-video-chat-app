import { comparePassword, jwtoken, verifyToken } from "../helper/jwtcontroller.js";
import { SendOtp } from "../helper/SendOtp.js";
import Otp from "../model/otpmodel.js";
import User from "../model/userModel.js";



export const handelAlreadyUsername = async (req, res) => {
    try {
      const { user_name } = req.params;
      if (!user_name || user_name.length <=3) {
        return res.status(400).json({ message: "Username is required",success:false });
      }
  
      const existingUser = await User.findOne({$and:[ {user_name},{otp_verify:true}] });
  
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists",success:false });
      }
  
      return res.status(200).json({ message: "Username is available",success:true });
    } catch (error) {
      console.error("Error checking username:", error);
      return res.status(500).json({ message: "Internal server error",success:false });
    }

  };

export const Sendotp=async(req,res)=>{
  try {
    const {email} = req.body
      const alreadyuser= await User.findOne({email});

      if(alreadyuser){
        return res.status(300).json({success:false,message:"Email Allready exist"})

      }

    let otp = Math.floor(1000 + Math.random() * 9000);
    await Otp.findOneAndDelete({ email });
   
     await Otp.create({ email, otp });
        await  SendOtp(email,otp)
       
     return res.status(201).json({ message: "Otp Send",success:true})



  } catch (error) {
    return res.status(500).json({ message: error.message,success:false})
  }
}

export const getuser=async(req,res)=>{
try {
  const {token}=req.params;
  const {id}= await  verifyToken(token)

  const getuser= await User.findById({_id:id})

  if(!getuser){
    return res.status(200).json({success:false,message:"user not find"})
  }

  return res.status(200).json({success:true,message:"user get",getuser})

  



} catch (error) {
  res.status(500).json({success:false,message:error.message})
}

}


export  const signUpController=async(req,res)=>{

try {
    const {email,name,password,user_name,otpval,gender}=req.body;

    if (!email || !name || !password || !user_name || !otpval || !gender) {
        return res.status(200).json({ message: "All fields are required", success: false });
      }

const otpmail=  await Otp.findOne({email});
if(otpmail.otp !== Number(otpval)){
  return res.status(200).json({ message:"Enter Valid Otp" ,success:false });
}

await Otp.findOneAndDelete({email})
    const existingUser = await User.findOne( {otp_verify:true,$or:[{email},{user_name}]} );
  
    if (existingUser) {
      return res.status(200).json({ message:existingUser.email==email?"Email already exists":"Username already exists" ,success:false });
    }

 


  const createduser=  await  User.create({email,name,password,user_name,gender})
  
    
res.cookie("intv",jwtoken(createduser._id),{
      path:"/",
      httpOnly:true,
      expires:new Date(Date.now()+60*60*60*24*90),
      sameSite:'none',
      secure:true,
    })

 return res.status(201).json({ message: "Signup user",success:true, createduser,token:jwtoken(createduser._id)})



} catch (error) {
    return res.status(500).json({ message: "Internal server error",success:false });
 
}


  }


export const loginController =async(req,res)=>{
  try {
    const {email,password}=req.body;
if(!email || !password){
  return res.status(400).json({success:false,})
}   

const user = await User.findOne({email});
  if(!user){
    return res.status(200).json({ message: "Intvalid email or password",success:false });
  }

   
  const compassword= await comparePassword(password,user.password)
  if(!compassword){
    return res.status(200).json({ message: "Intvalid email or password",success:false });

  }

  const Token=  jwtoken(user._id)
res.cookie("intv",jwtoken(user._id),{
  path:"/",
  httpOnly:true,
  expires:new Date(Date.now()+60*60*60*24*90),
  sameSite:'none',
  secure:true,
})
return res.status(200).json({message: "Login success",success:true,Token })

  } catch (error) {
        return res.status(500).json({ message: "Internal server error",success:false });

  }
  }


  export const logoutController = async(req,res)=>{
    res.clearCookie("intv", {
      path: "/",
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    return res.status(200).json({ message: "Logged out successfully", success:true });
  }