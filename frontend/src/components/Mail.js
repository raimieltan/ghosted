import React, {useState, useEffect } from 'react'
import "./css/mail.css"
const Mail = () => {
    const [mails, setMails ] = useState([])

    const getMail = async () => {
        try {

            const response = await fetch("http://localhost:8000/mail/retrieve", {
                headers: {token: localStorage.token}
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
        <div className="mail-main-container">
            {mails.map( mail => {
                return <div key={mail.message_id} className="mail-container">
                    <div className="mail-info">
                        <img className="mail-image" src={`http://localhost:8000/img/${mail.pic_src}`} width="50px" height="50px"></img>
                        <p className="mail-name">{mail.user_first_name}:</p>
                        <h6 className="mail-content">{mail.message_content}</h6>
                    </div>

                    <p className="mail-date">{mail.created_at}</p>
                    </div>
            }) }
        </div>
    )
}

export default Mail;