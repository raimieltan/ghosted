import React, {useState, useEffect} from 'react'
import getData from '../utils/GetData.js'
import {
    Link
  } from "react-router-dom"

const Following = () => {

    const [following, setFollowing] = useState([])
    const [followers, setFollowers] = useState([])

    const getDataFollowing = async () => {
        try {
            
            const response = await fetch("http://localhost:8000/connections/show/following", {
                headers: {token: localStorage.token}
            })
    
            const jsonData = await response.json();
    
            setFollowing(jsonData)
    
    
        } catch (error) {
            console.error(error.message)
        }
    }

    const getDataFollowers = async () => {
        try {
            
            const response = await fetch("http://localhost:8000/connections/show/followers", {
                headers: {token: localStorage.token}
            })
    
            const jsonData = await response.json();
    
            setFollowers(jsonData)
    
    
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect( () => {
        getDataFollowing();
        getDataFollowers();
    })

    const chatUser = (id) => {

        localStorage.setItem("conn_id", id);

    }

    return <div>
        <h2>Following</h2>
        {following.map ( follows => {
            return <div className="container">
                <p> { follows.user_first_name + " " + follows.user_last_name + " " + follows.user_age}</p>
                <Link className = "btn btn-success btn-block" to="/messages" onClick={ () => chatUser(follows.conn_id)}>Chat</Link>
            </div>
        })}

        <h2>Followers</h2>
            {followers.map ( follows => {
            return <div className="container">
                <p> { follows.user_first_name + " " + follows.user_last_name + " " + follows.user_age}</p>
                <Link className = "btn btn-success btn-block" to="/messages" onClick={ () => chatUser(follows.conn_id)}>Chat</Link>
            </div>
        })}
    </div>

}


export default Following;