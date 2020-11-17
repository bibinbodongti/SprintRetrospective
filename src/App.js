import React, { useEffect } from 'react';
import Header from './components/Header/Header';
import Login from './components/LoginSignUp/Login'
import ManageListBoardCard from './components/ManageListBoardCard/ManageListBoardCard';
import Board from './components/Board/Board'
import SignUp from './components/LoginSignUp/SignUp'
import Profile from './components/Profile/Profile';
import ChangePass from './components/Profile/ChangePass';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter
} from "react-router-dom";

const App = () => {
  const [isLogin, setIsLogin] = React.useState(false);
  useEffect(() => {
    if (document.cookie.includes('access_token')) setIsLogin(true);
  }, [isLogin]);
  const handleLogin = async (login) => {
    console.log(login);
    if (login === false) {
      await deleteAllCookies();
      console.log(document.cookie);
      setIsLogin(false);
    }
    else {
      console.log(document.cookie);
      setIsLogin(true);
    }
  }
  return (
    <HashRouter basename="/SprintRetrospective">
      <Router>
        <div>
          <Header isLogin={isLogin} handleLogin={handleLogin} />
          <Switch>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/logout">
              <Login isLogin={isLogin} type='logout' handleLogin={handleLogin} />
            </Route>
            <Route path="/login">
              <Login isLogin={isLogin} handleLogin={handleLogin} />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/boarddetail/:id" component={Board} />
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/changepassword">
              <ChangePass />
            </Route>
            <Route path="/SprintRetrospective">
              <ManageListBoardCard isLogin={isLogin} />
            </Route>
          </Switch>
        </div>
      </Router>
    </HashRouter>
  )
}

const deleteAllCookies = () => {
  return new Promise((resolve, reject) => {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    resolve(true);
  })
}
export default App;