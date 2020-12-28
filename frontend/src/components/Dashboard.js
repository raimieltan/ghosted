import React, {useState , useEffect } from "react"
import ListUsers from './displayUsers.js'
import { Link } from 'react-router-dom'
const Dashboard = ( {setAuth} ) => {



    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem("token")
        setAuth(false)
    }



    return (
        <div>
      
            <Link to="/profile">Profile</Link>
            <button className= "btn btn-primary" onClick= {e => logout(e)}>Logout</button>

            <ListUsers/>
        </div>
    )
}

export default Dashboard;