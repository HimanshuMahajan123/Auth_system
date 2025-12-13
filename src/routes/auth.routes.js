import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controllers.js";

const router = Router();

//unsecured routes : registration and login
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
