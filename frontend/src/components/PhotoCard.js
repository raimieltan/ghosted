import React, { useState, useEffect } from 'react'
import AddComment from "./AddComments.js"
import "./css/photocard.css"


const PhotoCard = ({ id, pic, name }) => {
    const [comments, setcomments] = useState([])

    const getComments = async () => {
        try {

            const response = await fetch(`http://localhost:8000/comments/retrieve/${id}`, {
                headers: { 'Authorization': 'Bearer ' + localStorage.token }
            })

            const parsedComments = await response.json()

            setcomments(parsedComments)



        } catch (error) {
            console.error(error.message)
            window.location.reload(false);

        }
    }

    useEffect(() => {
        getComments()

        const interval = setInterval(() => {
            getComments()
        }, 1000)

        return () => clearInterval(interval)
    })

    return (


        <div className="photo-card">
            <h4 className="pic-owner">{name}</h4>
            <img src={`http://localhost:8000/img/${pic}`} className="photo-pic" alt="feed-pic" />
            <div className="comment-body">
                {comments.map((comment) => {
                    {

                        return <div className="comment-content" key={comment.comment_id}>
                            <p><b>{comment.user_first_name}</b> {comment.comment_content}</p>
                        </div>
                    }
                })}


            </div>
            <AddComment pic_id={id} />
        </div>
    )
}

export default PhotoCard;