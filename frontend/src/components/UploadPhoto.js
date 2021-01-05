import React, { useState } from 'react'

const UploadPhoto = ({ type }) => {
    const [image, setImage] = useState({})

    const fileOnChange = (event) => {
        setImage(event.target.files[0])
    };

    const sendImage = async (event) => {
        try {

            let formData = new FormData();

            formData.append("my-image", image)
    
            const newImage = await fetch(`http://localhost:8000/uploads/${type}` ,{
                method: "POST",
                headers: {
                    token: localStorage.token
                },
                body: formData,
    
            })
            
        } catch (error) {
            console.error(error.message)
        }

    }

    return(
        <div>
                <input type="file" onChange={fileOnChange}></input>
                <button onClick={sendImage}>Upload</button>
        </div>

    )
}

export default UploadPhoto;