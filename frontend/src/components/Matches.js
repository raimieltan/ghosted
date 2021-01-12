import React, { useState, useEffect } from 'react'
import "./css/following.css"
import People from "./People"
import { toast } from 'react-toastify'

const Following = () => {

    const [following, setFollowing] = useState([])
    const [followers, setFollowers] = useState([])
    const [matches, setMatches] = useState([])



    const getData = async () => {
        try {

            const responseFollowing = await fetch(`http://localhost:8000/connections/show/following/${localStorage.user_id}`, {
                headers: { 'Authorization': 'Bearer ' + localStorage.token }
            })

            const responseFollowers = await fetch(`http://localhost:8000/connections/show/followers/${localStorage.user_id}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.token
                }
            })
            const jsonDataFollowing = await responseFollowing.json();
            const jsonDataFollowers = await responseFollowers.json();

            setFollowing(jsonDataFollowing)
            setFollowers(jsonDataFollowers)

        } catch (error) {
            console.error(error.message)
            window.location.reload(false);
        }
    }





    useEffect(() => {

        getData();

        const interval = setInterval(() => {
            getData();
        }, 1000)


        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const match = []

        followers.forEach((people_following) => {
            following.forEach((people_followers) => {

                if (people_followers.user_id === people_following.user_id) {

                    match.push(people_followers)
                }
            })
        })

        setMatches(match)


    }, [followers, following])



    return (
        <People people={matches} />
    )


}


export default Following;