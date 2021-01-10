import React, {useState, useEffect } from 'react'
import { toast } from "react-toastify"
import "./css/groups.css"
import { Link } from "react-router-dom"

const Groups = () => {

    const [groups, setGroups] = useState([])

    const getGroups = async () => {
        try {
            const response = await fetch('http://localhost:8000/groups/retrieve')

            const parseRes = await response.json()

            setGroups(parseRes)

            
        } catch (error) {
            console.error(error.message)
        }

    }



    const joinGroups = async (id) => {
     
        try {
            
            const response = await fetch(`http://localhost:8000/groups/join/${id}`,{
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    'Authorization':'Bearer ' + localStorage.token
                }
            })

            const parseRes = await response.json()

            if(parseRes.joined) {
                toast.success('Joined Successfully')
            } else {
     
                toast.error(parseRes.msg)
            }

            console.log(parseRes)
            
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getGroups()
    }, [])

    return (
        <div className="container">
            <ul className="nav">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page">
                    <Link className="link-class" to= "/profile">PROFILE</Link>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link">
                    <Link className="link-class" to= "/dashboard">DASHBOARD</Link>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link">
                    <Link className="link-class" to= "/mail">MAILS</Link>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" tabindex="-1">
                    <Link className="link-class" to= "/group-feed">GROUP CHAT</Link>
                    </a>
                </li>
                
            </ul>
            <hr/>
            <div className="flex-group">
            {groups.map( (group) => {
                return <div key={group.group_id}>
                        <div className="group-card">
                            <h1 className="display-4">TEAM</h1>
                            <h1 className="display-4">{group.group_name}</h1>
                            <button className="btn btn-outline-danger btn-lg" onClick={() => joinGroups(group.group_id)}>Join</button>
                        </div>
                    
                    
                </div>
            })}

            </div>

        </div>
    )
}

export default Groups