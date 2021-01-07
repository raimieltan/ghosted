import React, {useState, useEffect} from 'react'
import PhotoCard from "./PhotoCard"

const Feed = () => {

    const [photos, setPhotos] =  useState([])

    
    const getFeed = async () => {
        try {
        
            const response = await fetch("http://localhost:8000/photos/retrieve/posts" , {
                headers: {
                    'Authorization':'Bearer ' + localStorage.token
                }
            })

            const parsePhotos = await response.json()
            setPhotos(parsePhotos)
          

        } catch (error) {
            console.error(error.message)
        }
     
    }

    useEffect(() => {
        getFeed()
    },[])

    return (
        <div>
            {photos.map ( post => {
            return <div key={post.pic_id} >
                <PhotoCard id={post.pic_id} pic={post.pic_src} name={post.user_first_name} />
            </div>
        })}
        </div>
    )
}

export default  Feed
