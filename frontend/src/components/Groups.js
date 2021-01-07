import React, {useState, useEffect } from 'react'
import { toast } from "react-toastify"

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
                    token: localStorage.token
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
        <div>
            {groups.map( (group) => {
                return <div key={group.group_id}>
                    <span><p>{group.group_name} <button onClick={() => joinGroups(group.group_id)}>Join</button></p></span>
                    
                </div>
            })}
        </div>
    )
}

export default Groups