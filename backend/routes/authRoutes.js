import express from "express";
import { authController } from "../controllers/authController.js";
import { createUserValidation } from "../middlewares/createUserValidation.js";


const router = express.Router();

router.post("/signup", createUserValidation, authController.sigunp);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

export default router;