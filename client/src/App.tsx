import React, {useState, useEffect} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {isAuthenticated} from "./config/isAuthenticated"

// Components
import Header from "./components/Header";

// Views
import Home from "./views/Home";
import Register from "./views/Register";
import Login from "./views/Login";
import Uploader from "./views/Uploader";

interface IUserDatas {
  token: {
    id: number,
    username: string,
    iat: number,
    exp: number
  },
  auth: boolean
}

const App = () => {

  const [userDatas, setUserDatas] = useState<IUserDatas>({
    token: {id: 0, username: "", iat: 0, exp: 0},
    auth: false
  })

  useEffect(() => {
    const userDatas = async () => {
      const res = await isAuthenticated();

      setUserDatas(res)
    }

    userDatas()
  }, [])

  return (
    <>
    <Header isAuth={userDatas.auth} username={userDatas.token.username}/>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/register" component={() => (
        userDatas.auth ? <Redirect to="/"/> : <Register/>
      )}/>
      <Route exact path="/login" component={() => (
        userDatas.auth ? <Redirect to="/"/> : <Login/>
      )}/>
      <Route exact path="/upload-my-img" component={() => (
        userDatas.auth ? <Uploader/> : <Redirect to="/"/>
      )}/>
    </Switch>
    </>
  )
}

export default App;