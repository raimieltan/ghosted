import React, {useState, useEffect } from 'react'
import "./css/mail.css"
import { Link } from "react-router-dom"
const Mail = () => {
    const [mails, setMails ] = useState([])

    const getMail = async () => {
        try {

            const response = await fetch("http://localhost:8000/mail/retrieve", {
                headers: {'Authorization':'Bearer ' + localStorage.token}
            } )
            
            const jsonData = await response.json()

            setMails(jsonData)

        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect( () => {
        getMail()
    }, [])

    return (
        <div className="container">
            <ul class="nav">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page">
                    <Link className="link-class" to= "/profile">PROFILE</Link>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link">
                    <Link className="link-class" to= "/dashboard">DASHBOARD</Link>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" tabindex="-1">
                    <Link className="link-class" to= "/group-feed">GROUP CHAT</Link>
                    </a>
                </li>
            </ul>
            <hr/>
            <div className="mail-collection">
            {mails.map( mail => {
                return <div key={mail.message_id} className="mail-container">
                    <img className="mail-image" src={`http://localhost:8000/img/${mail.pic_src}`} width="50px" height="50px"></img>
                    <div className="mail-info">
                        
                        <p className="mail-name">{mail.user_first_name}</p>
                        <h6 className="mail-content">{mail.message_content}</h6>
                  
                    </div>

                    
                    </div>
            }) }
            </div>

        </div>
    )
}

export default Mail;