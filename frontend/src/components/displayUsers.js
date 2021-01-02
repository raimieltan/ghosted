import React, {Fragment, useState, useEffect } from 'react';

const DisplayUsers = () => {


    const [users, setUsers ] = useState([])


    const getUsers = async () => {
        try {
            
            const response = await fetch("http://localhost:8000/users", {
                headers:{ token: localStorage.token}
            })

            const existing = await fetch("http://localhost:8000/connections/show", {
                headers: {token: localStorage.token}
            })

            const users_existing = await existing.json()
            
            const users = await response.json();
            
            for(let i = 0; i < users_existing.length; i++){
                for(let j = 0; j < users.length; j++){
                    if(users[j].user_id === users_existing[i].user_id){
                        users.splice(j , 1)
                    }
                }
            }

            setUsers(users)
            
            

        } catch (error) {
            console.log(error.message)
        }
    }

    const dateUser = async (id) => {
        try {
            const date = await fetch(`http://localhost:8000/connections/add/${id}`, {
                method: "POST",
                headers: {
                    "Content-type" : "application/json",
                    token: localStorage.token }
            })

            setUsers(users.filter(user => user.user_id !== id))

        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect( () => {
        getUsers();
    })
return <Fragment>
<div className ="container text-center my-5">

    {users.map(user => {
    // let imageSrc = require(`../pictures/${user.id}.jpg`)
        return <div key = {user.user_id} className = "container">
                   
                        <div className='profile'>
                                <p>{user.user_first_name}</p>

                                <button className = "btn btn-success btn-block" onClick={() => dateUser(user.user_id)}>Date</button>
               
                         </div> 
           
              </div>

})}
</div>
</Fragment>;
};

export default DisplayUsers;