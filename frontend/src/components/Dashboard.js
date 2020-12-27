import React from "react"

const Dashboard = ( {setAuth} ) => {
    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={() => setAuth(false)} >Log out</button>
        </div>
    )
}

export default Dashboard;