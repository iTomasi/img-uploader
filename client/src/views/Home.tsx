import React, {useState, useEffect} from "react";
import Axios from "axios";
import host from "../config/host";
import ImgCard from "../components/ImgCard";
import "./scss/home.scss";

interface IPosts {
    id: number,
    username: string,
    comment: string,
    theimg: string
}

const Home = () => {

    const [posts, setPosts] = useState<IPosts[]>([])

    useEffect(() => {
        Axios.get(host.backend_server + "/posts-img")
            .then(res => setPosts(res.data.posts))

    }, [])

    return (
        <div className="content">
            <div className="imgs">{
                posts.map((post: any) => (
                    <ImgCard username={post.username} text={post.comment} img={post.theimg} />
                ))
            }</div>
        </div>
    )
}

export default Home;