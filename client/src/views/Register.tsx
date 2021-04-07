import React from "react";
import Axios from "axios";
import host from "../config/host";
import {useHistory} from "react-router-dom";
import "./scss/form.scss";

const Register = () => {
    const history = useHistory();

    const sendingDatas = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        Axios.post(host.backend_server + "/auth/register", {
            username: formData.get("username"),
            password: formData.get("password"),
            confirm_password: formData.get("confirm_password")
        }, {headers: {"Content-Type": "application/json"}})
            .then(res => {
                if (res.data.message !== "registered") return console.log(res.data);
                history.push("/login")
            })
    }

    return (
        <form className="iw_form" onSubmit={sendingDatas}>
            <div className="formSection">
                <label>Username</label>
                <input type="text" placeholder="Username..." name="username"/>
            </div>

            <div className="formSection">
                <label>Password</label>
                <input type="password" placeholder="Password..." name="password"/>
            </div>

            <div className="formSection">
                <label>Confirm Password</label>
                <input type="password" placeholder="Confirm Password..." name="confirm_password"/>
            </div>

            <button type="submit">Register</button>
        </form>
    )
};

export default Register;