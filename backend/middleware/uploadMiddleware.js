import multer from "multer";
import  cloudinary  from "../config/cloudinary";


const storage = multer.diskStorage({
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
  });

const upload = multer({ storage: storage});


export default upload;
