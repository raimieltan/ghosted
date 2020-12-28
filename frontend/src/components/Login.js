import React, {useState} from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"



const Login = ( {setAuth} ) => {

    const [inputs, setInputs] = useState( {
        email: "",
        password: ""
    })

    const {email, password} = inputs

    const onChange = (e) => {
        setInputs( {...inputs, [e.target.name] : e.target.value})
    }

    const onSubmitForm = async(e) => {
        e.preventDefault()

        const body = { email, password }

        try {

            const response = await fetch("http://localhost:8000/auth/login", {
                method: "POST",
                headers: { "Content-Type" : "application/json"},
                body: JSON.stringify(body)
            }
            )

            const parseRes = await response.json()

            if(parseRes.token) {
                localStorage.setItem("token", parseRes.token);

                setAuth(true)
                toast.success("Logged in sucessfully")
            } else {
                setAuth(false)
                toast.error(parseRes)
            }

            
        } catch (error) {
            console.error(error.message)
        }
    }
    return (
        <div>
            <h1 className= "text-center my-5"> Login</h1>
            <form onSubmit = {onSubmitForm}>
                <input type="email" name="email" placeholder="email" className="form-control my-3" value = {email} onChange = {e => onChange(e)} />
                <input type="password" name="password" placeholder="password" className="form-control my-3" value = {password} onChange = {e => onChange(e)}/>
                <button className = "btn btn-success btn-block">Login</button>
               
            </form>
            <Link to="/register">Register</Link>
        </div>
    )
}

export default Login;