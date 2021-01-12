import React, { useState, useEffect } from "react"
import DisplayUsers from './displayUsers.js'
import { Link } from 'react-router-dom'
const Dashboard = ({ setAuth }) => {



    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem("token")
        setAuth(false)
    }



    return (
        <div className="container">
            <ul className="nav">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page">
                        <Link className="link-class" to="/profile">PROFILE</Link>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link">
                        <Link className="link-class" to="/groups">GROUPS</Link>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link">
                        <Link className="link-class" to="/mail">MAILS</Link>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" tabIndex="-1">
                        <Link className="link-class" to="/group-feed">GROUP CHAT</Link>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" tabIndex="-1">
                        <Link className="link-class" to="/feed">PHOTOS</Link>
                    </a>
                </li>
            </ul>
            <hr />
            <DisplayUsers />


        </div>
    )
}

export default Dashboard;