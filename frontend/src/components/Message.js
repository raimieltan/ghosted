import React, { useEffect, useState } from 'react'

const Message = () => {
    const [messages, setMessages] = useState([])

    const [inputs, setInputs] = useState( {
        message_content: ""
    })

    const {message_content} = inputs

    const id = localStorage.conn_id

    const onChange = (e) => {
        setInputs( {...inputs, [e.target.name] : e.target.value})
    }


    const getMessage = async () => {
        
        try {
            const messages = await fetch(`http://localhost:8000/messages/retrieve/${id}`)
            
            const messageJson = await messages.json()

            setMessages(messageJson)
        
        } catch (error) {
            console.error(error.message)
        }
    }

    const sendMessage = async (e) => {
        e.preventDefault()

        const body = { message_content }
        try {
            const newMessage = await fetch(`http://localhost:8000/messages/send/${id}`, {
                method: "POST",
                headers: {
                    "Content-type" : "application/json",
                    token: localStorage.token },
                body: JSON.stringify(body)
            })
            
            // const { message_content } = req.body

            
        
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect( () => {
        getMessage();
    })
    

    return  <div>
    <div>
        {messages.map(message => {
            return <div key = {message.message_id} className = "container">
                <p>{message.user_first_name}:{message.message_content}</p>
                <p>{message.message_date}</p>
            </div>
        } )}
    </div>
    <form onSubmit = {sendMessage}>
                <input type="text" name="message_content" placeholder="chat here" className="form-control my-3" value = {message_content} onChange = {e => onChange(e)} />
              
                <button className = "btn btn-success btn-block">send</button>
               
            </form>

    </div>
}

export default Message;