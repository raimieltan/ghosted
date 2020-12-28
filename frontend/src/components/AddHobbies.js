import React, {useState} from "react"

const AddHobby = () => {
    
    const [inputs, setInputs] = useState( {
        hobby_content: ""
    })

    const {hobby_content} = inputs

    const onChange = (e) => {
        setInputs( {...inputs, [e.target.name] : e.target.value})
    }

    const onSubmitForm = async(e) => {
        const body = { hobby_content }

        try {

            const response = await fetch("http://localhost:8000/hobby/add", {
                method: "POST",
                headers: {
                    "Content-type" : "application/json",
                    token: localStorage.token },
                body: JSON.stringify(body)
            })

            
            
        } catch (error) {
            console.error(error.message)
        }
    }

    


    return (
        <div>
            <form onSubmit = {onSubmitForm}>
                <input type="hobby_content" name="hobby_content" placeholder="hobby" className="form-control my-3" value = {hobby_content} onChange = {e => onChange(e)} />
              
                <button className = "btn btn-success btn-block">Add Hobby</button>
               
            </form>
        </div>
    )

}

export default AddHobby;