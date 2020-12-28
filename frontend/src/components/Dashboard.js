import React, {useState , useEffect } from "react"
import ListUsers from './displayUsers.js'

const Dashboard = ( {setAuth} ) => {

    const [name, setName] = useState("")

    async function getName() {
        try {
            const response = await fetch("http://localhost:8000/dashboard/", {
                headers: { token: localStorage.token}
            })

            const parseRes = await response.json()
            console.log(parseRes)

            setName(parseRes.user_first_name)
        } catch (error) {
            console.error(error.message)
        }
    }

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem("token")
        setAuth(false)
    }

    useEffect( () => {
        getName()
    }, [])

    return (
        <div>
            <h1>Hello {name}</h1>
            <button className= "btn btn-primary" onClick= {e => logout(e)}>Logout</button>

            <ListUsers/>
        </div>
    )
}

export default Dashboard;