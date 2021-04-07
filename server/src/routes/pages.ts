import {Router} from "express";
import {imgUploader_multer} from "../config/multer";
import connection from "../database/mysql";
import jwt from "jsonwebtoken";
import path from "path";
import secret from "../config/secret";
const router = Router();

router.get("/img/:id", (req, res) => {
    const id = req.params.id;

    res.sendFile(path.join(__dirname, "../../public/" + id))
})

router.get("/posts-img", (req, res) => {
    connection.query("SELECT * FROM posts", (err, resp) => {
        if (err) return console.log(err);

        res.json({posts: resp})
    })
})

router.post("/upload-img", imgUploader_multer, (req, res) => {
    const {comment} = req.body;
    const fileName = req.file;
    const headerToken: any = req.headers["x-access-token"];

    try {
        if (fileName === undefined) return res.json({message: "only .png, .jpg or .jpeg files."});
        if (comment === "" || !comment) return res.json({message: "please introduce a comment"});

        const token: any = jwt.verify(headerToken, secret.jwt);

        connection.query("INSERT INTO posts (username, comment, theimg) VALUE (?,?,?)", [token.username, comment, fileName.filename], (err, resp) => {
            if (err) return console.log(err)

            res.json({message: "image uploaded"})
        })

    }

    catch(e) {
        console.log("Token Invalid")
    }
})

export default router;