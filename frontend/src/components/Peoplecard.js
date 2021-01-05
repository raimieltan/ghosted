import React , {useState, useEffect } from 'react'
import "./css/peoplecard.css"
const PeopleCard = ( { name, age , bio, id, pic} ) => {

    const [rating , setRating] = useState("")
 
    const getRating = async (id) => {
        try {
           
            const getRating = await fetch(`http://localhost:8000/ratings/retrieve/${id}` ,{
                headers: {token: localStorage.token}
            })

            const parseRes = await getRating.json()

         

            setRating(parseRes)
           
            
        } catch (error) {
            console.error(error.message)

        }

    }

    useEffect( () => {
        getRating(id)
    })
    
    return (
        <div className="people-container">
            <img className="people-pic" src={`http://localhost:8000/img/${pic}`} width="200px" height="400px"></img>
            <div className="people-info">
                <h3 className="people-name">{name}</h3>
                <p className="people-age">{age}</p>
                <p className="people-rating">{rating}</p>
              
                
                

            </div>
            <p className="people-bio">{bio}</p>

        </div>
    )
}

export default PeopleCard;