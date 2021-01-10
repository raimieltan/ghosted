import React, {useState, useEffect} from 'react'
import PhotoCard from "./PhotoCard"
import "./css/feed.css"
import ProfileCard from "./ProfileCard"
import Upload from "./UploadPhoto"
import { Link } from "react-router-dom"
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

        const interval = setInterval( () => {
            getFeed()
        }, 1000)

        return()=>clearInterval(interval)
    },[])

    return (
        <div className="container">
            
            <ul className="nav">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page">
                    <Link className="link-class" to= "/profile">PROFILE</Link>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link">
                    <Link className="link-class" to= "/dashboard">DASHBOARD</Link>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" tabindex="-1">
                    <Link className="link-class" to= "/group-feed">GROUP CHAT</Link>
                    </a>
                </li>
            </ul>
            <hr/>

            <div className="main-feed container">

            <div className="feed-container">
                {photos.map ( post => {
                return <div key={post.pic_id} >
                    <PhotoCard id={post.pic_id} pic={post.pic_src} name={post.user_first_name} />
                </div>
            })}
            </div>

            <div className="feed-profile">
            <ProfileCard />
            <Upload type={'posts'} />
            </div>

            </div>

        </div>


    )
}

export default  Feed
