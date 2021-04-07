import React, {useState} from "react";
import Axios from "axios";
import host from "../config/host";
import {useHistory} from "react-router-dom";
import "./scss/form.scss";

const Uploader = () => {
    const history = useHistory();

    const [fileName, setFileName] = useState<string>("Select a IMG...");
    const [progressBar, setProgressBar] = useState({
        porcentaje: 0,
        display: false
    })

    const uploadingImg = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        setProgressBar((prev: any) => (
            {...prev, display: true}
        ))

        Axios.post(host.backend_server + "/upload-img", formData, {
            headers: {"x-access-token": localStorage.getItem("token")},
            onUploadProgress: progressEvent => {
                const getPorcentaje = Math.round((progressEvent.loaded * 100) / progressEvent.total);

                setProgressBar((prev: any) => (
                    {...prev, porcentaje: getPorcentaje}
                ))
            }
        })
            .then(res => {
                if (res.data.message !== "image uploaded") return console.log(res.data);

                history.push("/");
            })

    }

    const handleInputFile = (e: any) => {
    
        try {
            const getFileName = e.currentTarget.files[0].name;

            if (getFileName.length > 13) {
                setFileName(getFileName.substring(0, 13) + "...")
                return
            }

            setFileName(getFileName)
        }

        catch(e) {
            console.log(e)
            setFileName("Select a IMG...")
        }
    }

    return (
        <form className="iw_form" onSubmit={uploadingImg}>
            <div className="formSection formImg">
                <label htmlFor="inputFile">IMG</label>
                <span>{fileName}</span>
                <input id="inputFile" type="file" name="userImg" onChange={handleInputFile} style={{display: "none"}}/>
            </div>

            <div className="progressBar" style={{display: progressBar.display ? "block" : "none"}}>
                <span className="porcentaje" style={{width: `${progressBar.porcentaje}%`}}></span>
            </div>

            <div className="formSection">
                <label>Write you Comment</label>
                <textarea placeholder="Write your Comment..." name="comment"></textarea>
            </div>

            <button type="submit">Add</button>
        </form>
    )
}

export default Uploader;