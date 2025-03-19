import express from "express";
import { signUpController,handelAlreadyUsername ,loginController,logoutController,Sendotp,getuser} from "../controller/UserController.js";


const router = express.Router();
router.get("/signup/:user_name", handelAlreadyUsername);
router.post("/sendotp", Sendotp);
router.get("/getuser/:token", getuser);

router.post("/signup", signUpController);
router.post("/login", loginController);
router.get("/logout",logoutController);



export default router;
