import './App.css';
import ListUsers from './components/displayUsers.js'
import Dashboard from './components/Dashboard.js'
import Login from './components/Login.js'
import Register from './components/Register.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import { Fragment, useState } from 'react';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean)
  }

  return (
    <Fragment>
      <Router>
        <div>
          <Switch>
            <Route exact path="/login" render={props => !isAuthenticated ? <Login {...props} setAuth = {setAuth} /> : <Redirect to="/dashboard" />} />
            <Route exact path="/Register" render={props => !isAuthenticated ? <Register {...props} setAuth = {setAuth} /> : <Redirect to="/login" />} />
            <Route exact path="/Dashboard" render={props => isAuthenticated ?  <Dashboard {...props} setAuth = {setAuth} /> : <Redirect to="/login" />} />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
