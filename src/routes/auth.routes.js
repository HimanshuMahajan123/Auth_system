import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  userRegisterationValidator,
  userLoginValidator,
} from "../validators/index.js";
import upload from "../middlewares/multer.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

//unsecured routes : registration and login
router.post(
  "/register",
  upload.single("avatar"),
  userRegisterationValidator(),
  validate,
  registerUser
);
router.post("/login", userLoginValidator(), validate, loginUser);

//secured routes
router.post("/logout", verifyJWT, logoutUser);

export default router;
