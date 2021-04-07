import {Router} from "express";
import connection from "../database/mysql";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import secret from "../config/secret";

const router = Router();

router.get("/", (req, res) => {
    const getToken: any = req.headers["x-access-token"];

    try {
        const token = jwt.verify(getToken, secret.jwt)

        res.json({
            token,
            auth: true
        })
    }

    catch(e) {
        console.log("INVALID TOKEN")
        res.json({
            token: {
                id: 0,
                username: "",
                iat: 0,
                exp: 0
            },
            auth: false
        })
    }
})

router.post("/register", (req, res) => {
    const {username, password, confirm_password} = req.body;

    if (username === "" || password === "" || confirm_password === "" || !username || !password || !confirm_password) {
        return res.json({message: "Datas missing"})
    }

    connection.query("SELECT * FROM accounts WHERE username = ?", [username], async (err, resp) => {
        if (err) return console.log(err);
        if (resp[0] !== undefined) return res.json({message: "Username already exist."});
        else if (password !== confirm_password) return res.json({message: "Password are not same"});

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt)

        connection.query("INSERT INTO accounts (username, password) VALUE (?,?)", [username, hash], (err, resp) => {
            if (err) return console.log(err);

            res.json({message: "registered"})
        })
    })
});

router.post("/login", (req, res) => {
    const {username, password} = req.body;

    if (username === "" || password === "" || !username || !password) {
        res.json({message: "Datas missing"})
        return
    }

    connection.query("SELECT * FROM accounts WHERE username = ?", [username], async (err, resp) => {
        if (err) return console.log(err);
        if (resp[0] === undefined) return res.json({message: "Username not found"});

        const compare = await bcrypt.compare(password, resp[0].password)
        if (!compare) return res.json({message: "password is invalid"});

        const token = jwt.sign({
            id: resp[0].id,
            username: resp[0].username
        }, secret.jwt, {expiresIn: 60*60*24});

        res.json({message: "logged", token})
    })
})


export default router;