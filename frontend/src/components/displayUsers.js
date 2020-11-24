import React, {Fragment, useState, useEffect } from 'react';


const DisplayUsers = () => {

    const [users, setUsers ] = useState([])

    const getUsers = async () => {
        try {
            
            const response = await fetch("http://localhost:8000/")
            const jsonData = await response.json();

            setUsers(jsonData)
            

        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect( () => {
        getUsers();
    }, [])

    
return <Fragment>
<div>{users.map(user => {
        return <p>Name: {user.first_name} {user.last_name}</p>

})}</div>
</Fragment>;
};

export default DisplayUsers;