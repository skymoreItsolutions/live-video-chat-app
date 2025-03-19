import mongoose from "mongoose";

 export const  connectDB=async()=>{
    try {
    await    mongoose.connect(process.env.DB_URL,{dbName:"myapp"})
console.log("DB Connected")
    } catch (error) {
        console.log(`Mongodb Error ${error}`)
    }
    
}