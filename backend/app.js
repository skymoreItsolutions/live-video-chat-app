
import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./helper/dbConfig.js"
import userRouter from "./router/userRouter.js"
import friendRouter from "./router/friendRouter.js"
import MessageRoute from "./router/MessageRoute.js"
import cookieParser from "cookie-parser"
import http from "http"
import cors from "cors"
import { Server } from "socket.io"


dotenv.config()
const app= express()
const server = http.createServer(app)
app.use(express.json())
app.use(cookieParser())

app.use(cors({ origin: "*", 
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    

}))
app.use("/api/user",userRouter)
app.use("/api/message",MessageRoute)
app.use("/api/friend",friendRouter)


app.get('/me',(req,res)=>{
  res.send("Im Working")
})

const io=  new Server(server,{
    cors:{
        origin:"*",
        methods: ["GET", "POST"]
    }
});



io.on("connection"  ,(socket)=>{
  
    socket.on("joinRoom", (room) => {
        socket.join(room);
        
        socket.to(room).emit("message", { user: "System", text: `User ${socket.id} joined the room` });
      });
      socket.on("sendMessage", ({ room, sender,message}) => {
      
            io.to(room).emit("message", {  sender, message });
        
     });
    //  socket.on("tping",(room)=>{
    //     io.to(room).emit("typing", { typing: true });
    //  })

      

})







const Port = process.env.PORT || 8080;
connectDB()
server.listen(Port,()=>{
    console.log(`server are running on port ${Port}`)
})
