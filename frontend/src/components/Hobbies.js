import React, {useState, useEffect } from "react"

const DisplayHobbies = () => {
    const [hobbies, setHobbies] = useState([])

    const getHobbies = async () => {
        try {
            const response = await fetch("http://localhost:8000/hobbies/show" , {
                headers: {token: localStorage.token }
            })

            const jsonData = await response.json();

            setHobbies(jsonData)
        } catch (error) {
            console.error(error.message)
        }

    }

    useEffect( () => {
        getHobbies();
    }, [])

    return <div>
        {hobbies.map( hobby => {
            return <div key={hobby.hobby_id}>
                <p>{hobby.hobby_content}</p>
            </div>
        })}
    </div>
}

export default DisplayHobbies;