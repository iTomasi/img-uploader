import express from "express";
import cors from "cors";
import path from "path";
import host from "./config/host";
import routeAuth from "./routes/auth";
import routePages from "./routes/pages";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({origin: host.react_server}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "../public")));
app.use("/auth", routeAuth);
app.use("/", routePages);


app.listen(port, () => console.log(`SV ON PORT ${port}`));
