import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import AddHobby from "./AddHobbies.js"
import Matches from './Matches.js'
import Upload from './UploadPhoto'
import ProfileCard from "./ProfileCard"

import "./css/profile.css"

const Profile = ({ setAuth }) => {


  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    setAuth(false)
  }



  return (
    <div>



      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" >Ghosted</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon "></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page">
                  <Link className="link-class" to="/dashboard">Dashboard</Link>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" >
                  <Link className="link-class" to="/mail">Mail</Link>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                  <Link className="link-class" to="/groups">Groups</Link>
                </a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
     
                </a>
                <ul className="dropdown-menu bg-light" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item">
                      <AddHobby />
                    </a></li>
                  <li>
                    <a className="dropdown-item">
                      <Upload type={'profile'} />
                    </a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <a className="dropdown-item">
                      <button className="btn btn-light" onClick={e => logout(e)}>Logout</button>
                    </a></li>
                </ul>
              </li>

            </ul>

          </div>
        </div>
      </nav>
      <div>



        <ProfileCard />

        <Matches />


      </div>
    </div>


  )
}

export default Profile;