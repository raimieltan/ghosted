import React, {useState, useEffect} from 'react'
import Hobbies from "./Hobbies.js"
import "./css/profile.css"

const ProfileCard = () => {

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
            localStorage.setItem('user_id', parseRes.user_id)

            setFirstName(parseRes.user_first_name)
            setLastName(parseRes.user_last_name)
            setAge(parseRes.user_age)
            setBio(parseRes.user_bio)
            setUserId(parseRes.user_id)
            
         

          
        } catch (error) {
            console.error(error.message)
        }
    }


    useEffect( () => {
        getName()
        getProfilePhoto()

        const interval = setInterval( () => {
            getName()
            getProfilePhoto()
        }, 10000)
    }, [])

    return (
        <div className="profile-container container text-center"> 
        <div className="profile-info">
        <img src={`http://localhost:8000/img/${profilePic}`} className="profile-pic" alt="profile" width="100px" height="100px"></img>
            <div className="text-infos">
                <h3 className="name display-6">{first_name} {last_name}, {age}</h3>
                <p>{bio}</p>
                <Hobbies id={user_id} />
            </div>


        </div>
        <hr/>
    </div>
    )
    
}

export default ProfileCard;
