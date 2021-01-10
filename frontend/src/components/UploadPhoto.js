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
            formData.append("text" , "text")


            console.log(formData.entries())

            if( type === 'profile'){
                const deletePrevious = await fetch('http://localhost:8000/photos/delete', {
                    method: "DELETE",
                    headers: {
                        'Authorization':'Bearer ' + localStorage.token
                    }
                })
            }


    
            const newImage = await fetch(`http://localhost:8000/uploads/${type}` ,{
                method: "POST",
                headers: {
                    'Authorization':'Bearer ' + localStorage.token
                },
                body: formData,
    
            })



            
        } catch (error) {
            console.error(error.message)
        }

    }

    return(
           
        <div>
                <input type="file" onChange={fileOnChange}/>
                <button className="button-upload btn btn-light" onClick={sendImage}>Upload</button>
        </div>
    

    )
}

export default UploadPhoto;