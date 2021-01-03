import React, {useState, useEffect } from 'react'

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
        <div>
            {mails.map( mail => {
                return <div key={mail.message_id}>
                    <p>{mail.message_content}</p>
            <       p>{mail.created_at}</p>
                    </div>
            }) }
        </div>
    )
}

export default Mail;