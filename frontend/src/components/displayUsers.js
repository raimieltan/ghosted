import React, {Fragment, useState, useEffect } from 'react';

const DisplayUsers = () => {

    const [users, setUsers ] = useState([])

    const getUsers = async () => {
        try {
            
            const response = await fetch("http://localhost:8000/")
            const jsonData = await response.json();

            setUsers(jsonData)
            // console.log(users)
            

        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect( () => {
        getUsers();
    })
return <Fragment>
<div>

    {users.map(user => {
    // let imageSrc = require(`../pictures/${user.id}.jpg`)
        return <div className='profile'>
            {/* <img src={imageSrc.default} alt="Girl in a jacket" width="250" height="350"/> */}
            <div className='overlay'></div>
            <p>{user.user_first_name}</p>

            <div className='action'>
                <button>Ghost</button>
                <button>Date</button>
                <button>tar</button>
            </div>
            
            </div> 

})}
</div>
</Fragment>;
};

export default DisplayUsers;