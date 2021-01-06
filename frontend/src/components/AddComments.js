import React, {useState} from "react"

const AddComment = ( { pic_id } ) => {

    const [comment, setComment ] = useState('')

    const onChange = (e) => {
        setComment( e.target.value )
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()
        const body = { comment }

        try {

            const response = await fetch(`http://localhost:8000/comments/add/${pic_id}` , {
                method: "POST",
                headers: {
                    "Content-type" : "application/json",
                    token: localStorage.token
                },
                body: JSON.stringify(body)
            })
            
        } catch (error) {
            console.error(error.message)

        }
    }
    

    


    return (
        <div className = "container">
            <form onSubmit = {onSubmitForm}>
                <input type="text" name="comment" placeholder="comment" className="form-control my-3" value = {comment} onChange = {e => onChange(e)} />
              
                <button className = "btn btn-success btn-block">comment</button>
               
            </form>
        </div>
    )

}

export default AddComment;