import multer from "multer"
import path from 'node:path'


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder where files get saved cb(err,value) cb means callback ,also the uploads has to be created before hand.
  },
  filename: (req, file, cb) => {
    // unique name to avoid overwriting files with the same name
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`; //path.extname(file.originalname) pulls the exact file extension
    cb(null, uniqueName);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit, adjust as needed
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});
