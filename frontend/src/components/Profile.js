import React, {useState , useEffect } from "react"
import { Link } from 'react-router-dom'
import Hobbies from "./Hobbies.js";
import AddHobby from "./AddHobbies.js"
import Following from './Following.js'

const Profile = ( {setAuth} ) => {

    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [age, setAge] = useState("")
    const [bio, setBio] = useState("")

    async function getName() {
        try {
            const response = await fetch("http://localhost:8000/dashboard/", {
                headers: { token: localStorage.token}
            })

            const parseRes = await response.json()

            setFirstName(parseRes.user_first_name)
            setLastName(parseRes.user_last_name)
            setAge(parseRes.user_age)
            setBio(parseRes.user_bio)
        } catch (error) {
            console.error(error.message)
        }
    }

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem("token")
        setAuth(false)
    }

    useEffect( () => {
        getName()
    }, [])

    return (
        <div className="text-center my-5"> 
            <p >{first_name} {last_name} </p>
            <p>{age}</p>
            <p>{bio}</p>
            <Hobbies />
            <AddHobby />
            <button className= "btn btn-primary" onClick= {e => logout(e)}>Logout</button>
            
            <Following />
            <Link to= "/dashboard">Dashboard</Link>
            <Link to= "/mail">Mail</Link>

        </div>
    )
}

export default Profile;