import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return;

    //upload user image on cloudinary using uploader
    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: "Auth_system",
      resource_type: "image",
    });

    //now image is uploaded on the cloudinary
    if (response) {
      console.log(
        "avatar is successfully uploaded on cloudinary",
        response.secure_url,
      );
    }
    return response?.secure_url;
  } catch (error) {
    console.log("Error while uploading avatar on cloudinary ", error);

    fs.unlinkSync(localFilePath); //remove the locally saved temporay file in case of error
    return null;
  }
};

export { uploadOnCloudinary };
