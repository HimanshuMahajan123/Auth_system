import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  userRegisterationValidator,
  userLoginValidator,
} from "../validators/index.js";
import upload from "../middlewares/multer.js";

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

export default router;
