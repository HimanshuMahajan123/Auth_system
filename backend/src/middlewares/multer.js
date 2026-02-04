import multer from "multer";
import { nanoid } from "nanoid";
import path from "path";
import { fileURLToPath } from "url";

/*
  IMPORTANT KNOWLEDGE (MULTER):

  When the request hits your controller via Multer, it has been transformed like this:

  Text Fields(Request Part)  ----->  req.body(Where Multer Puts It) -----> (like : username, email, password)
  The File(Request Part) -----> req.body(Where Multer Puts It) -----> (An object containing the filename, buffer, and size : like avatar)

*/

// recreate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// go from src/middlewares -> backend/public/temp
const uploadPath = path.join(__dirname, "../../public/temp");

//diskStorage tells Multer to store the file on disk (your server) temporarily.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = nanoid(6);
    cb(null, `${file.fieldname}-${uniqueSuffix}`); //Prevents overwriting files with the same name.
  },
});

const upload = multer({ storage: storage }); //Create the Multer instance , This upload object has methods like: .single("fieldname")

export default upload;
