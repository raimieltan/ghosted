import React , {useState, useEffect } from 'react'
import AddComment from "./AddComments"


const PhotoCard = ( { id, pic, name} ) => {
    const [comments, setcomments] = useState([])

    const getComments = async () => {
        try {

            const response = await fetch(`http://localhost:8000/comments/retrieve/${id}`, {
                headers: {token: localStorage.token}
            })

            const parsedComments = await response.json()

            setcomments(parsedComments)


            
        } catch (error) {
            console.error(error.message)
        }
    } 

    useEffect(() => {
        getComments()

    }, [])
    
    return (
        <div>
            <p> {name} </p>
            <img className="photo-pic" src={`http://localhost:8000/img/${pic}`} width="200px" height="400px"></img>
            <AddComment pic_id = {id}/>
            {comments.map( (comment) => {{
                return <div key={comment.comment_id}>
                    <p>{comment.user_first_name}: {comment.comment_content}</p>
                </div>
            }})}
        </div>
    )
}

export default PhotoCard;