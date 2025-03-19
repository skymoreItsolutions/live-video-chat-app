import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, 
      },
      message: {
        type: String,
        required: true,
        trim: true, 
      },
      friend: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Friend",
        required: true, 
      },
      
    },
    { timestamps: true } 
  );


  const Message = mongoose.model("Message",messageSchema)

  export default Message;
  