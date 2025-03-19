import mongoose from "mongoose";

const otpSchema= new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,  
        lowercase: true, 
      },
      otp: {
        type: Number,  
        required: true,
      },
},{timestamps:true}) 



const Otp= mongoose.model("Otp", otpSchema);

export default Otp;