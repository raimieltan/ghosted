import React, {useState , useEffect } from "react"
import { Link } from 'react-router-dom'
import Hobbies from "./Hobbies.js";
import AddHobby from "./AddHobbies.js"
import Following from './Following.js'
import Upload from './UploadPhoto'
import Mail from './Mail.js'
import Group from './Groups.js'

import "./css/profile.css"

const Profile = ( {setAuth} ) => {

    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [age, setAge] = useState("")
    const [bio, setBio] = useState("")
    const [profilePic, setProfilePic] = useState("")
    const [user_id , setUserId] = useState(0)

    

    async function getProfilePhoto(){
        try {
            const response = await fetch("http://localhost:8000/photos/retrieve/profile", {
                headers: {token: localStorage.token}
            })

            const parseRes = await response.json()

            setProfilePic(parseRes.pic_src)

            
        } catch (error) {
            console.error(error.message)
        }
    }
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
            setUserId(parseRes.user_id)
            
         

          
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
        getProfilePhoto()
    }, [])


    return (
        <div className="container">

<div class="sidenav">
<Mail />
</div>            
      
    
            <div className="main-container">
            
            <div className="profile-container container text-center my-5"> 
                <div className="profile-info">
                <img src={`http://localhost:8000/img/${profilePic}`} className="profile-pic" alt="profile" width="100px" height="100px"></img>
                    <div className="text-infos">
                        <h3 className="name display-6">{first_name} {last_name} {user_id}</h3>
                        <p>{bio}</p>
                        <Hobbies id={user_id} />
                    </div>


                </div>
            <AddHobby />
            <button className= "btn btn-primary" onClick= {e => logout(e)}>Logout</button>
            
            
            <Upload type={'profile'} />



            <Upload type={'posts'} />
            <Link to= "/dashboard">Dashboard </Link>
            <Link className="mail-link" to= "/mail">Mail </Link>
            <Link to= "/groups">Join Groups</Link>
       

        </div>
        <Following />
        {/* <PeopleCard name={first_name} age={age} id={user_id} bio={bio} pic={profilePic} /> */}

        </div>
        </div>

        
    )
}

export default Profile;