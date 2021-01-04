import React, {useState, useEffect } from "react"

const SendBoo = ( { user_id } ) => {

    const [message, setMessage ] = useState('')

    

    const onChange = (e) => {
        setMessage( e.target.value )
    }

    const onSubmitForm = async(e) => {
        e.preventDefault()
        const body = { message }

        
        try {

            const response = await fetch(`http://localhost:8000/mail/send/${user_id}` , {
                method: "POST",
                headers: {
                    "Content-type" : "application/json",
                    token: localStorage.token },
                body: JSON.stringify(body)
            })

            console.log(body)

            
        } catch (error) {
            console.error("errr: " + error.message)
            
        }
    }


    return (
        <div className = "container">
            <form onSubmit = {onSubmitForm}>
                <input type="text" name="message" placeholder="Send Boo" className="form-control my-3" value = {message} onChange = {e => onChange(e)} />
              
                <button className = "btn btn-success btn-block">Boo</button>
               
            </form>
        </div>
    )
}

export default SendBoo;