import React, {useState , useEffect } from "react"
import DisplayUsers from './displayUsers.js'
import { Link } from 'react-router-dom'
const Dashboard = ( {setAuth} ) => {



    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem("token")
        setAuth(false)
    }



    return (
        <div className = "container">
                        <ul class="nav">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page">
                    <Link className="link-class" to= "/profile">PROFILE</Link>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link">
                    <Link className="link-class" to= "/groups">GROUPS</Link>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link">
                    <Link className="link-class" to= "/mail">MAILS</Link>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" tabindex="-1">
                    <Link className="link-class" to= "/group-feed">GROUP CHAT</Link>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" tabindex="-1">
                    <Link className="link-class" to= "/feed">PHOTOS</Link>
                    </a>
                </li>
            </ul>
            <hr/>
            <DisplayUsers/>
           
            
        </div>
    )
}

export default Dashboard;