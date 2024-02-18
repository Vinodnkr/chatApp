import express from "express";
import { userController } from "../controllers/userController.js"
import userLogged from "../middlewares/userLogged.js"


const router = express.Router();

router.get("/", userLogged, userController.searchUsers);

export default router;