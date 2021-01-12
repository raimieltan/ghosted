import React, { useState } from "react"

const AddHobby = () => {

    const [hobby, setHobby] = useState('')


    const onChange = (e) => {
        setHobby(e.target.value)
    }


    const onSubmitForm = async (e) => {
        setHobby('')
        e.preventDefault()
        const body = { hobby }

        try {

            const response = await fetch("http://localhost:8000/hobbies/add", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    'Authorization': 'Bearer ' + localStorage.token
                },
                body: JSON.stringify(body)
            })



        } catch (error) {
            console.error(error.message)
        }
    }




    return (
        <div>
            <form id="hobby-form" onSubmit={onSubmitForm}>
                <input type="text" name="hobby" placeholder="hobby" className="form-control my-3" value={hobby} onChange={e => onChange(e)} />

            </form>
        </div>
    )

}

export default AddHobby;