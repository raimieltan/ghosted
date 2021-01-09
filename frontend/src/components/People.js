import React from 'react'
import PeopleCard from "./Peoplecard"
import SendBoo from "./SendBoo"
import Cover from "./ui_photos/Matches.png"
import Chat from "./ui_photos/chat.png"
import ghost from './ui_photos/ghost.png'
import { toast } from 'react-toastify'

const People = ( {people} ) => {

    const ghostUser = async( id , name) => {

     

        try {

            const ghosted = await fetch(`http://localhost:8000/connections/ghost/${id}` , {
                method: "DELETE",
                headers: {
                    'Authorization':'Bearer ' + localStorage.token
                }
            })

            const parseGhosted = await ghosted.json()
            toast.error('Ghosted ' + name)

            
        } catch (error) {

            console.error(error.message)
            
        }

    } 
    
    return (
        <div className="following-container container">
        
        {/* <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-border carousel-inner">
            <div class="people-card carousel-item active">
                <img src={Cover} class="card-pic d-block" width="350px" height="550px" alt="..."/>
             
            </div> */}
            {people.map ( follows => {
            return <div key={follows.user_id}>

                <PeopleCard name={follows.user_first_name} age={follows.user_age} id={follows.user_id} bio={follows.user_bio} pic={follows.pic_src}  />
                <div className="button-container">
                    <p>
                        <span>
                            <a className="chat btn btn-light" data-bs-toggle="collapse" href={"#collapseExample" + follows.user_id} role="button" aria-expanded="false" aria-controls="collapseExample">
                                <img src={Chat} class="card-pic d-block" width="15px" height="22px" alt="..."/>
                            </a>

                            <button className = "ghost btn btn-light" onClick={(e) => ghostUser(follows.user_id, follows.user_first_name)}>
                                <img src={ghost} width="15px" height="15px" />
                            </button>

                        </span>

                    </p>
                </div>

                <div class="collapse" id={"collapseExample" + follows.user_id}>
                    <div class="boo card card-body">
                        <SendBoo user_id={follows.user_id} />
                    </div>
                </div>

                
                

            </div>
        })}
            {/* </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </a>
        </div> */}
    </div>

    )
}

export default People;