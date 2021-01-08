import React, {useState , useEffect } from "react"
import { Link } from 'react-router-dom'
import Hobbies from "./Hobbies.js";
import AddHobby from "./AddHobbies.js"
import Following from './Following.js'
import Upload from './UploadPhoto'
import ProfileCard from "./ProfileCard"

import "./css/profile.css"

const Profile = ( {setAuth} ) => {


    const logout = (e) => {
      e.preventDefault()
      localStorage.removeItem("token")
      setAuth(false)
  }

    return (
        <div>

     
      
      <nav class="navbar navbar-expand-lg navbar-light bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" >Ghosted</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page">
            <Link className="link-class" to= "/dashboard">Dashboard</Link>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" >
            <Link className="link-class" to= "/mail">Mail</Link>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link">
            <Link className="link-class" to= "/groups">Groups</Link>
          </a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           
          </a>
          <ul class="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
            <li>
                <a class="dropdown-item">
                    <AddHobby />
                </a></li>
            <li>
                <a class="dropdown-item">
                    <Upload type={'profile'} />
                </a></li>
            <li><hr class="dropdown-divider"/></li>
            <li>
                <a class="dropdown-item">
                    <button className= "btn btn-light" onClick= {e => logout(e)}>Logout</button>
                </a></li>
          </ul>
        </li>

      </ul>

    </div>
  </div>
</nav>
            <div>
            
            

        <ProfileCard />
        
        <Following />
       

        </div>
        </div>

        
    )
}

export default Profile;