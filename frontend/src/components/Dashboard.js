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
      
            <Link to="/profile">Profile</Link>
            <button className= "btn btn-primary" onClick= {e => logout(e)}>Logout</button>

            <DisplayUsers/>
        </div>
    )
}

export default Dashboard;