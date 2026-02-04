import { validationResult } from "express-validator";
import { ApiError } from "../utils/api-error.js";
import fs from "fs";

//Need : Collect validation errors & Stop the request if input is invalid
export const validate = (req, res, next) => {
  const errors = validationResult(req); //reads validation errors added by express-validator

  if (errors.isEmpty()) {
    return next(); //If all validations passes , call next
  }

  const extractedErrors = [];

  errors.array().map((err) => {
    extractedErrors.push({
      [err.path]: err.msg,
    });
  });
  //If there is any file uploaded( like avatar ) , remove the temporarily saved file
  if (req.file) {
    const localFilePath = req.file.path;
    fs.unlinkSync(localFilePath);
  }

  console.log("Validation errors : ", extractedErrors);
  throw new ApiError(422, "Validation Error", extractedErrors);
};
