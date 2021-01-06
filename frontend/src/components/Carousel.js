import React from 'react'
import PeopleCard from "./Peoplecard"
import SendBoo from "./SendBoo"

const Carousel = ( {people} ) => {
 
    
    return (
        <div className="following-container">
        <h2>Matches</h2>
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-border carousel-inner">
            <div class="people-card carousel-item active">
                <img src="https://www.randomdoggiegenerator.com/randomdoggie.php" class="card-pic d-block" width="250px" height="400px" alt="..."/>
                <p>Name here Name here Name here</p>
            </div>
            {people.map ( follows => {
            return <div className="carousel-item">
                <PeopleCard name={follows.user_first_name} age={follows.user_age} id={follows.user_id} bio={follows.user_bio} pic={follows.pic_src}  />
                <SendBoo user_id={follows.user_id} />
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