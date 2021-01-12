import React, { useState, useEffect } from 'react';
import PeopleCard from "./Peoplecard"
import Heart from './ui_photos/heart.png'
import "./css/dashboard.css"

const DisplayUsers = () => {


    const [users, setUsers] = useState([])
    const [filterAge, setFilterAge] = useState('21')


    const getUsers = async (age, id) => {
        try {

            const response = await fetch(`http://localhost:8000/users/${age}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.token
                }
            })

            const existing = await fetch(`http://localhost:8000/connections/show/following/${id}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.token
                }
            })

            const users_existing = await existing.json()

            const users = await response.json();

            for (let i = 0; i < users_existing.length; i++) {
                for (let j = 0; j < users.length; j++) {
                    if (users[j].user_id === users_existing[i].user_id) {
                        users.splice(j, 1)
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
                    "Content-type": "application/json",
                    'Authorization': 'Bearer ' + localStorage.token
                }
            })

            setUsers(users.filter(user => user.user_id !== id))

        } catch (error) {
            console.error(error.message)
            window.location.reload(false);
        }
    }

    const onSubmitForm = (e) => {
        e.preventDefault()
        getUsers(filterAge, localStorage.user_id);

    }

    const onChange = (e) => {
        setFilterAge(e.target.value)

    }


    useEffect(() => {
        getUsers(filterAge, localStorage.user_id);
    }, [])
    return (
        <div className="flex-dashboard container text-center">
            <form onSubmit={onSubmitForm}>
                <label>Age</label>
                <input className="form-filter" type="text" name="filterAge" placeholder="age" value={filterAge} onChange={(e) => onChange(e)} />
                <button className="btn btn-light btn-sm filter-button">Filter</button>
            </form>

            {users.map(user => {

                return <div key={user.user_id} className="dashboard-card">

                    <PeopleCard
                        name={user.user_first_name} age={user.user_age} bio={user.user_bio} id={user.user_id} pic={user.pic_src} />
                    <button className="heart btn btn-light" onClick={() => dateUser(user.user_id)}>
                        <img src={Heart} width="20px" height="25px" />
                    </button>

                </div>

            })}
        </div>
    )

};

export default DisplayUsers;