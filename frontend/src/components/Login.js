import React from "react"

const Login = ( {setAuth} ) => {
    return (
        <div>
            <h1>Login</h1>
            <button onClick={() => setAuth(true)} >Authenticate</button>
        </div>
    )
}

export default Login;