import React, {Fragment, useState, useEffect } from 'react';

const DisplayUsers = () => {

    const [users, setUsers ] = useState([])

    const getUsers = async () => {
        try {
            
            const response = await fetch("http://192.168.0.28:8000/")
            const jsonData = await response.json();

            setUsers(jsonData)
            

        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect( () => {
        getUsers();
    })
return <Fragment>
<div>{users.map(user => {
    let imageSrc = require(`../pictures/${user.id}.jpg`)
        return <div className='profile'>
            <img src={imageSrc.default} alt="Girl in a jacket" width="250" height="350"/>
            <div className='overlay'></div>
            <p>{user.first_name}, {user.age} {user.location}</p>

            <div className='action'>
                <button>Ghost</button>
                <button>Date</button>
                <button>tar</button>
            </div>
            
            </div> 

})}</div>
</Fragment>;
};

export default DisplayUsers;