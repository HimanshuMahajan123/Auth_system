import { body } from "express-validator";

export const userRegisterationValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email format is incorrect"),

    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLowercase()
      .withMessage("Username must be in lowercase")
      .isLength({ min: 3, max: 20 })
      .withMessage("username must be atleast 3 charcters long"),
    body("password").trim().notEmpty().withMessage("password is required"),
  ];
};

export const userLoginValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email format is incorrect"),

    body("password").trim().notEmpty().withMessage("password is required"),
  ];
};
