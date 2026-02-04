import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

// Its job is to protect routes by allowing only logged-in users (valid JWT) to continue.
export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", ""); //get accessToken either from cookies or header("Authorization")

  //if there is no accessToken , it means user is invalid(not logged in).Request stops here
  if (!token) {
    throw new ApiError(401, "Unauthorized request! No token provided");
  }

  try {
    //jwt.verify() , verifies the token signature , checks token expiry and decodes payload
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Unauthorized request! User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Unauthorized request! Invalid token");
  }
});
