import Dashboard from './components/Dashboard.js'
import Login from './components/Login.js'
import Register from './components/Register.js'
import Profile from './components/Profile.js'
import Mail from './components/Mail.js'
import Homepage from './components/Homepage.js'
import Feed from "./components/Feed";
import Groups from "./components/Groups"
import GroupFeed from "./components/GroupFeed"


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import { Fragment, useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

function App() {

  const [Authentication, setAuthentication] = useState(false)

  const frontEndAuthentication = async () => {
    try {
      const res = await fetch("http://localhost:8000/verify", {
        headers: { 'Authorization': 'Bearer ' + localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ? setAuthentication(true) : setAuthentication(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    frontEndAuthentication();
  }, []);


  const setAuth = (boolean) => {
    setAuthentication(boolean)
  }

  return (
    <Fragment>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" render={() => !Authentication ? <Homepage /> : <Redirect to="/profile" />} />
            <Route exact path="/login" render={() => !Authentication ? <Login setAuth={setAuth} /> : <Redirect to="/profile" />} />
            <Route exact path="/register" render={() => !Authentication ? <Register setAuth={setAuth} /> : <Redirect to="/profile" />} />
            <Route exact path="/dashboard" render={() => Authentication ? <Dashboard setAuth={setAuth} /> : <Redirect to="/login" />} />
            <Route exact path="/profile" render={() => Authentication ? <Profile setAuth={setAuth} /> : <Redirect to="/login" />} />
            <Route exact path="/mail" render={() => Authentication ? <Mail /> : <Redirect to="/login" />} />
            <Route exact path="/feed" render={() => Authentication ? <Feed /> : <Redirect to="/login" />}></Route>
            <Route exact path="/group-feed" render={() => Authentication ? <GroupFeed /> : <Redirect to="/login" />}></Route>
            <Route exact path="/groups" render={() => Authentication ? <Groups /> : <Redirect to="/login" />} />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
