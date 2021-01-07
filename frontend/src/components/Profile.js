import React, {useState , useEffect } from "react"
import { Link } from 'react-router-dom'
import Hobbies from "./Hobbies.js";
import AddHobby from "./AddHobbies.js"
import Following from './Following.js'
import Upload from './UploadPhoto'

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
                headers: {
                    'Authorization':'Bearer ' + localStorage.token
                }
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
                headers: { 'Authorization':'Bearer ' + localStorage.token}
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
        <div>

     
      
      <nav class="navbar navbar-expand-lg navbar-light bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" >Ghosted</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page">
            <Link className="link-class" to= "/dashboard">Dashboard</Link>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" >
            <Link className="link-class" to= "/mail">Mail</Link>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link">
            <Link className="link-class" to= "/groups">Groups</Link>
          </a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           
          </a>
          <ul class="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
            <li>
                <a class="dropdown-item">
                    <AddHobby />
                </a></li>
            <li>
                <a class="dropdown-item">
                    <Upload type={'profile'} />
                </a></li>
            <li><hr class="dropdown-divider"/></li>
            <li>
                <a class="dropdown-item">
                    <button className= "btn btn-light" onClick= {e => logout(e)}>Logout</button>
                </a></li>
          </ul>
        </li>

      </ul>

    </div>
  </div>
</nav>
            <div>
            
            

            <div className="profile-container container text-center my-5"> 
                <div className="profile-info">
                <img src={`http://localhost:8000/img/${profilePic}`} className="profile-pic" alt="profile" width="100px" height="100px"></img>
                    <div className="text-infos">
                        <h3 className="name display-6">{first_name} {last_name} {age}</h3>
                        <p>{bio}</p>
                        <Hobbies id={user_id} />
                    </div>


                </div>
                <hr/>
        </div>
        
        <Following />
       

        </div>
        </div>

        
    )
}

export default Profile;