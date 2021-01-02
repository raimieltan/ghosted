import React, {useState, useEffect} from 'react'
import getData from '../utils/GetData.js'

const Following = () => {

    const [following, setFollowing] = useState([])

    const getData = async () => {
        try {
            
            const response = await fetch("http://localhost:8000/connections/show", {
                headers: {token: localStorage.token}
            })
    
            const jsonData = await response.json();
    
            setFollowing(jsonData)
    
    
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect( () => {
        getData();
    })

    return <div>
        <h1>Following</h1>
        {following.map ( follows => {
            return <div>
                <p> { follows.user_first_name + " " + follows.user_last_name + " " + follows.user_age}</p>
            </div>
        })}
    </div>

}



export default Following;