import React, { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

import './css/register.css'
const Register = ({ setAuth }) => {

    const [inputs, setInputs] = useState({
        first_name: "",
        last_name: "",
        age: "",
        gender: "",
        bio: "",
        email: "",
        password: ""
    })


    const { first_name, last_name, age, gender, bio, email, password } = inputs

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()

        const body = { first_name, last_name, gender, bio, age, email, password }

        try {

            const response = await fetch("http://localhost:8000/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)

            })

            const parseRes = await response.json()

            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token)
                setAuth(true)
                toast.success("Registered Successfully")

            }
            else {
                setAuth(false)
                toast.error(parseRes)
            }




        } catch (error) {
            console.error(error.message)
            window.location.reload(false);

        }
    }
    return (
        <div className="register-container container">
            <h1 className="text-center my-5">Register</h1>
            <form onSubmit={onSubmitForm}>
                <input type="text" name="first_name" placeholder="first name" className="form-control my-3" value={first_name} onChange={e => onChange(e)} />
                <input type="text" name="last_name" placeholder="last name" className="form-control my-3" value={last_name} onChange={e => onChange(e)} />
                <input type="number" name="age" placeholder="age" className="form-control my-3" value={age} onChange={e => onChange(e)} />
                {/* <input type="text" name="gender" placeholder="gender" className="form-control my-3" value = {gender} onChange = {e => onChange(e)}/> */}
                <select className="gender-form form-select form-select-lg mb-3" aria-label=".form-select-lg example" type="gender" name="gender" value={gender} onChange={e => onChange(e)} >
                    <option selected>GENDER</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <input type="text" name="bio" placeholder="bio" className="form-control my-3" value={bio} onChange={e => onChange(e)} />
                <input type="email" name="email" placeholder="email" className="form-control my-3" value={email} onChange={e => onChange(e)} />
                <input type="password" name="password" placeholder="password" className="form-control my-3" value={password} onChange={e => onChange(e)} />

                <button className="btn-danger btn-block">Submit</button>
            </form>

            <Link to="/login"><button type="button" className="login-btn btn btn-sm btn-light login-btn">LOGIN</button></Link>
        </div>
    )
}

export default Register;