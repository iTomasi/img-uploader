import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `uploaded__${Date.now()}${path.extname(file.originalname)}`)
    },
    destination: path.join(__dirname, "../../public")
});

const imgUploader_multer = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
            return cb(null, true)
        }

        return cb(null, false)
    }
}).single("userImg");

export {
    imgUploader_multer
}