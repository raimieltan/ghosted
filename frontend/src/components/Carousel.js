import React from 'react'
import PeopleCard from "./Peoplecard"
import SendBoo from "./SendBoo"
import Cover from "./ui_photos/Matches.png"
import Chat from "./ui_photos/chat.png"
const Carousel = ( {people} ) => {
 
    
    return (
        <div className="following-container">
        
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-border carousel-inner">
            <div class="people-card carousel-item active">
                <img src={Cover} class="card-pic d-block" width="350px" height="550px" alt="..."/>
             
            </div>
            {people.map ( follows => {
            return <div key={follows.user_id} className="carousel-item">

                <PeopleCard name={follows.user_first_name} age={follows.user_age} id={follows.user_id} bio={follows.user_bio} pic={follows.pic_src}  />
                <div className="chat">
                    <p>
                        <a class="btn btn-light" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                        <img src={Chat} class="card-pic d-block" width="10px" height="10px" alt="..."/>
                        </a>
                    </p>
                </div>

                <div class="collapse" id="collapseExample">
                    <div class="card card-body">
                        <SendBoo user_id={follows.user_id} />
                    </div>
                </div>

                
                

            </div>
        })}
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </a>
        </div>
    </div>

    )
}

export default Carousel;