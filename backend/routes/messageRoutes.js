import express from "express";
import { messageController } from "../controllers/messageController.js";
import userLogged from "../middlewares/userLogged.js"


const router = express.Router();


router.get("/:id", userLogged, messageController.getMessages);
router.post("/send/:id", userLogged, messageController.sendMessage);

export default router;