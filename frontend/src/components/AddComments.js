import React, {useState} from "react"

const AddComment = ( { pic_id } ) => {

    const [comment, setComment ] = useState('')

    const onChange = (e) => {
        setComment( e.target.value )
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()
        setComment('')
        const body = { comment }

        try {

            const response = await fetch(`http://localhost:8000/comments/add/${pic_id}` , {
                method: "POST",
                headers: {
                    "Content-type" : "application/json",
                    'Authorization':'Bearer ' + localStorage.token
                },
                body: JSON.stringify(body)
            })
            
        } catch (error) {
            console.error(error.message)

        }
    }
    

    


    return (
        <div className = "comment-box">
            <form onSubmit = {onSubmitForm}>

                <input type="text" name="comment" placeholder="comment" className="comment-form form-control" value = {comment} onChange = {e => onChange(e)} />
               
            </form>
        </div>
    )

}

export default AddComment;