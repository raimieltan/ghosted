import React , {useState, useEffect } from 'react'
import "./css/peoplecard.css"
import Hobbies from './Hobbies'

const PeopleCard = ( { name, age , bio, id, pic} ) => {


    
    return (
        <div className="p-container">

        <div className="people-container">
            <img className="people-pic" src={`http://localhost:8000/img/${pic}`} width="200px" height="400px"></img>
            <div className="people-info">
                <h3 className="people-name">{name}</h3>
                <p className="people-age">{age}</p>
            </div>
            <p className="people-bio">{bio}</p>
            <Hobbies id={id}/>

        </div>

        </div>

    )
}

export default PeopleCard;