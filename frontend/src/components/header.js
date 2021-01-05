import React from 'react';
import './css/header.css'
import logo from './ui_photos/logo.png'
import { Link } from 'react-router-dom'



const Headers = () => {


return  <div className="topBar">
    <img className="logo" src={logo} alt="Ghosted logo" width="55" height="50"/>
    
    <Link to="/login"><button className="btn btn-light login">LOG IN</button></Link>
      
</div>



    

};

export default Headers;