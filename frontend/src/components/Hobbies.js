import React, {useState, useEffect } from "react"
import "./css/hobbies.css"


const DisplayHobbies = ( { id }  ) => {
    const [hobbies, setHobbies] = useState([])

    const getHobbies = async () => {
        try {
            const response = await fetch(`http://localhost:8000/hobbies/show/${id}` , {
                headers: {'Authorization':'Bearer ' + localStorage.token }
            })

            const jsonData = await response.json();

            setHobbies(jsonData)
        } catch (error) {
            console.error(error.message)
        }

    }

    useEffect( () => {
        getHobbies();
    }, [id])

    return <div className="hobbies-container">
        {hobbies.map( hobby => {
            return <div className="hobby-item" key={hobby.hobby_id}>
                <p className="badge badge-light">{hobby.hobby_content}</p>
            </div>
        })}
    </div>
}

export default DisplayHobbies;