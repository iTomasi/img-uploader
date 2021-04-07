import React from "react";
import "./scss/imgCard.scss";
import host from "../config/host";

interface IImgCard {
    img: string,
    username: string,
    text: string
}

const ImgCard = ({img, username, text}: IImgCard) => {
    return (
        <div className="img">
            <img src={host.backend_server + "/img/" + img} alt={username}/>

            <div className="info">
                <p>{text}</p>
                <span>Uploaded By {username}</span>
            </div>
        </div>
    )
}

export default ImgCard;