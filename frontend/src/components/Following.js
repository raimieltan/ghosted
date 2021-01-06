import React, {useState, useEffect} from 'react'
import SendBoo from "./SendBoo.js"
import "./css/following.css"
import PeopleCard from "./Peoplecard.js"
import Carousel from "./Carousel"

const Following = () => {

    const [following, setFollowing] = useState([])
    const [followers, setFollowers] = useState([])
    const [matches , setMatches] = useState([])



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

    useEffect( () => {
        const match = []

        followers.forEach( (people_following) => {
            following.forEach( (people_followers) => {
                
                if(people_followers.user_id === people_following.user_id){
                   
                    match.push(people_followers)
                }
            })
        })

        setMatches(match)
        
       
    }, [followers, following])


    console.log(matches)

    return (
        <Carousel people={matches}/>
    )
        

}


export default Following;