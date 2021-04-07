import React from "react";
import Axios from "axios";
import host from "../config/host";
import "./scss/form.scss";

const Login = () => {

    const loggin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        Axios.post(host.backend_server + "/auth/login", {
            username: formData.get("username"),
            password: formData.get("password")
        }, {headers: {"Content-Type": "application/json"}})
            .then(res => {
                if (res.data.message !== "logged") return console.log(res.data);

                localStorage.setItem("token", res.data.token);
                window.location.href = "/";
            })
    }

    return (
        <form className="iw_form" onSubmit={loggin}>
            <div className="formSection">
                <label>Username</label>
                <input type="text" placeholder="Username..." name="username"/>
            </div>

            <div className="formSection">
                <label>Password</label>
                <input type="password" placeholder="Password..." name="password"/>
            </div>

            <button type="submit">Log In</button>
        </form>
    )

};

export default Login;