import express from "express";
import { sendRequest ,acceptRequest,rejectRequest,getrequestFriendListController,getFriendListController,FindFriend,unsendRequest} from "../controller/FriendController.js";
// import { userMiddlewere } from "../helper/userMidelewere.js";

const router = express.Router();


router.post("/request/send", sendRequest)
router.post("/request/unsend", unsendRequest)
router.post("/request/accept",acceptRequest)
router.post("/request/reject",rejectRequest)
router.get("/allrequest/:token",getrequestFriendListController)
router.get("/allfriends/:token",getFriendListController)
router.post("/serchfriend",FindFriend)


export default router