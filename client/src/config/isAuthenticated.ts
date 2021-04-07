import Axios from "axios";
import host from "../config/host"

export const isAuthenticated = async () => {

    const tokenHeader = localStorage.getItem("token")
    
    const sendingToken = await Axios.get(host.backend_server + "/auth/", {
        headers: {"x-access-token": tokenHeader}
    })

    return sendingToken.data
}