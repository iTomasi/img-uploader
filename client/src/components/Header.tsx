import React, {useState, useEffect} from "react";
import {NavLink, useHistory} from "react-router-dom";
import "./scss/header.scss";

interface IHeaderProps {
    isAuth: boolean,
    username: string
}

const Header = ({isAuth, username}: IHeaderProps) => {
    const history = useHistory();

    const [getUserWidth, setGetUserWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setGetUserWidth(window.innerWidth)
        })
    }, [getUserWidth])

    const DK_HEADER = () => {

        const HeaderRight = () => {
            if (isAuth) {
                return (
                    <>
                    <h2>Hey {username}</h2>
                    <button type="button" onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/login"
                    }}>Logout</button>
                    </>
                )
            }

            return (
                <>
                <button type="button" onClick={() => history.push("/login")}>Sign In</button>
                <button type="button" onClick={() => history.push("/register")}>Sign Up</button>
                </>
            )
        }

        return (
            <header className="iw_header-DK">
                <div className="left">
                    <h2>Img Uploader</h2>
                </div>

                <nav>
                    <ul>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/upload-my-img">Upload Img</NavLink></li>
                    </ul>
                </nav>

                <div className="right"><HeaderRight/></div>
            </header>
        )
    }

    const MB_HEADER = () => {

        const [showNav, setShowNav] = useState<boolean>(false);

        useEffect(() => {

            const hiddeNav = (e: any) => {
                if (showNav && !e.target.classList.contains("i__bars")) {
                    setShowNav(false)
                }
            }

            window.addEventListener("click", hiddeNav);

            return () => {
                window.removeEventListener("click", hiddeNav)
            }

            

        }, [showNav])

        const handleBars = () => {
            if (!showNav) return setShowNav(true);
        }

        return (
            <header className="iw_header-MB">
                <div className="header">
                    <i className="i__bars fas fa-bars" onClick={handleBars}></i>
                    <h2>Img Uploader</h2>
                </div>

                <nav style={{display: showNav ? "block" : "none"}}>
                    <ul>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/upload-my-img">Upload Img</NavLink></li>
                    </ul>
                </nav>
            </header>
        )
    }

    return getUserWidth >= 850 ? <DK_HEADER/> : <MB_HEADER/>
    
}

export default Header;