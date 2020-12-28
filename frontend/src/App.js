import Dashboard from './components/Dashboard.js'
import Login from './components/Login.js'
import Register from './components/Register.js'
import Profile from './components/Profile.js'

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

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean)
  }

  async function isAuth() {
    try {
      
      const response = await fetch("http://localhost:8000/auth/is-verify" , {
        headers: { token: localStorage.token}
      })

      const parseRes = await response.json()


      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect( () => {
    isAuth()
  })

  return (
    <Fragment>
      <Router>
        <div>
          <Switch>
            <Route exact path="/login" render={props => !isAuthenticated ? <Login {...props} setAuth = {setAuth} /> : <Redirect to="/profile" />} />
            <Route exact path="/register" render={props => !isAuthenticated ? <Register {...props} setAuth = {setAuth} /> : <Redirect to="/login" />} />
            <Route exact path="/dashboard" render={props => isAuthenticated ?  <Dashboard {...props} setAuth = {setAuth} /> : <Redirect to="/login" />} />
            <Route exact path="/profile" render={props => isAuthenticated ?  <Profile {...props} setAuth = {setAuth} /> : <Redirect to="/login" />} />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
