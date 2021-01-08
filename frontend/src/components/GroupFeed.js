import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import "./css/groupfeed.css"

const GroupFeed = () => {
    
    const [groups, setGroups] = useState([])

    const [messages, setMessages] = useState([{group_id: 1}])

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

    useEffect( () => {

        const interval=setInterval( () => {
            
            getGroupMessages(messages[0].group_id)
        }, 1000)  


        return() =>clearInterval(interval)
        
    })

    
    return(
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
                    <Link className="link-class" to= "/groups">GROUPS</Link>
                    </a>
                </li>
            </ul>
            <hr/>

            <div className="group-feed-container container">

                <div className="group-list">
                {groups.map ( (group) => {
                return <div className="group-names"  key={group.group_id}>
                    <button onClick={ () => getGroupMessages(group.group_id)} type="button" className="btn btn-light btn-large">{group.group_name}</button>
                </div>
                })}
                </div>


                <div className="message-box">

                        <div className="message-content">
                        {messages.map ( (message ) => {
                                return <div className="message-text" key={message.message_id}>
                                    <p><b>{message.user_first_name}</b> {message.message_content}</p>
                                </div>
                            })}
                        </div>
                        
                        <div className="send-message">

                        <form onSubmit={onSubmitForm} className="submit-form">
                                <div className="form-group">
                                    <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Send Message" value={message} onChange={(e) => onChange(e)}/>
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                            </form>

                        </div>



                </div>




                </div>

        </div>

    )
}

export default  GroupFeed;