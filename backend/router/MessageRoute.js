import { getallmessage,messages,sendMessage } from "../controller/MessageController.js";
import express from "express"

const route=express.Router()

route.post("/allmessage",getallmessage)
route.get("/allmessage/:messageroom",messages)
route.post("/sendmessage",sendMessage)

export default route
