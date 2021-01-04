import React, {useState, useEffect} from 'react'
import SendBoo from "./SendBoo.js"

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
    }, [])


    return <div>
        <h2>Following</h2>
        {following.map ( follows => {
            return <div key={follows.user_id} className="container">
                <p> { follows.user_first_name + " " + follows.user_last_name + " " + follows.user_age}</p>
                <SendBoo user_id={follows.user_id}/>
            </div>
        })}

        <h2>Followers</h2>
        {followers.map ( follows => {
            return <div key={follows.user_id} className="container">
                <p> { follows.user_first_name + " " + follows.user_last_name + " " + follows.user_age}</p>
            </div>
        })}

    </div>

}


export default Following;