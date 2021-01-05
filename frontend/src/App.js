import Dashboard from './components/Dashboard.js'
import Login from './components/Login.js'
import Register from './components/Register.js'
import Profile from './components/Profile.js'
import Mail from './components/Mail.js'
import Homepage from './components/Homepage.js'



import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import { Fragment, useState, useEffect } from 'react';

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:8000/auth/verify", {
        method: "POST",
        headers: { token: localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);


  const setAuth = (boolean) => {
    setIsAuthenticated(boolean)
  }
  return (
    <Fragment>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" render={props => !isAuthenticated ? <Homepage /> : <Redirect to="/profile" />}/>
            <Route exact path="/login" render={props => !isAuthenticated ? <Login {...props} setAuth = {setAuth} /> : <Redirect to="/profile" />} />
            <Route exact path="/register" render={props => !isAuthenticated ? <Register {...props} setAuth = {setAuth} /> : <Redirect to="/login" />} />
            <Route exact path="/dashboard" render={props => isAuthenticated ?  <Dashboard {...props} setAuth = {setAuth} /> : <Redirect to="/login" />} />
            <Route exact path="/profile" render={props => isAuthenticated ?  <Profile {...props} setAuth = {setAuth} /> : <Redirect to="/login" />} />
            <Route exact path="/mail" render={props => isAuthenticated ?  <Mail /> : <Redirect to="/login" />} />
         </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
