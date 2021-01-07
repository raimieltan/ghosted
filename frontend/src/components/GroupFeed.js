import React, { useEffect, useState } from 'react'

const GroupFeed = () => {
    
    const [groups, setGroups] = useState([])

    const [messages, setMessages] = useState([])

    const [message, setMessage ] = useState("")

    const getJoinedGroups = async () => {
        try {
            const response = await fetch(`http://localhost:8000/groups/retrieve/joined` , {
                headers: {
                    'Authorization':'Bearer ' + localStorage.token
                }
            })

            const parseRes = await response.json()
            setGroups(parseRes)

        } catch (error) {
            console.error(error.message)
        }

    }

    const getGroupMessages = async ( id ) => {

        try {

            const response = await fetch(`http://localhost:8000/group-messages/retrieve/${id}`)

            const parseRes = await response.json()

            setMessages(parseRes)
            
        } catch (error) {
            console.error(error.message)
        }


    }

    const onChange = (e) => {
        setMessage( e.target.value )

    }

    const onSubmitForm = async (e) => {
        e.preventDefault()
        const group_id = messages[0].group_id
        console.log(messages)

        try {

            const body = { message }

            const sendMessage = await fetch(`http://localhost:8000/group-messages/send/${group_id}` , {
                method: "POST",
                headers: {
                    "Content-type" : "application/json",
                    'Authorization':'Bearer ' + localStorage.token
                },
                body: JSON.stringify(body)
            })

            getGroupMessages(group_id)
            
          
        } catch (error) {
            
        }

    }

    useEffect(() => {
        getJoinedGroups()
        
 
    }, [])

    
    return(
        <div className="container">

            
        {groups.map ( (group) => {
            return <div  key={group.group_id}>
                <button onClick={ () => getGroupMessages(group.group_id)} type="button" className="btn btn-light btn-large">{group.group_name}</button>
            </div>
        })}


            {messages.map ( (message ) => {
                return <div key={message.message_id}>
                    <p>{message.user_first_name}: {message.message_content}</p>
                </div>
            })}

            <form onSubmit={onSubmitForm} className="sendMessage">
                <div className="form-group">
                    <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Send Message" value={message} onChange={(e) => onChange(e)}/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
            </form>


        </div>
    )
}

export default  GroupFeed;