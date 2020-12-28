import React, {useState , useEffect } from "react"


const Profile = ( {setAuth} ) => {

    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [age, setAge] = useState("")

    async function getName() {
        try {
            const response = await fetch("http://localhost:8000/dashboard/", {
                headers: { token: localStorage.token}
            })

            const parseRes = await response.json()
            console.log(parseRes)

            setFirstName(parseRes.user_first_name)
            setLastName(parseRes.user_last_name)
            setAge(parseRes.user_age)
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
            <p>{first_name} {last_name} </p>
            <p>{age}</p>
            <button className= "btn btn-primary" onClick= {e => logout(e)}>Logout</button>

        </div>
    )
}

export default Profile;