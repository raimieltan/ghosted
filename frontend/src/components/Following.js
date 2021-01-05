import React, {useState, useEffect} from 'react'
import SendBoo from "./SendBoo.js"
import "./css/following.css"
import PeopleCard from "./Peoplecard.js"

const Following = () => {

    const [following, setFollowing] = useState([])
    const [followers, setFollowers] = useState([])
    const [matches , setMatches] = useState([])



    const getDataFollowing = async () => {
        try {
            
            const response = await fetch("http://localhost:8000/connections/show/following", {
                headers: {token: localStorage.token}
            })
    
            const jsonData = await response.json();
    
            setFollowing(jsonData)
    
        } catch (error) {
            console.error(error.message)
        }
    }

    const getDataFollowers = async () => {
        try {
            
            const response = await fetch("http://localhost:8000/connections/show/followers", {
                headers: {token: localStorage.token}
            })
    
            const jsonData = await response.json();
    
            setFollowers(jsonData)
    
        } catch (error) {
            console.error(error.message)
        }
    }



    useEffect( () => {
        getDataFollowing();
        getDataFollowers();
        
    }, [])

    useEffect( () => {
        const match = []

        followers.forEach( (people_following) => {
            following.forEach( (people_followers) => {
                
                if(people_followers.user_id === people_following.user_id){
                   
                    match.push(people_followers)
                }
            })
        })

        setMatches(match)
       
    }, [followers, following])




    return <div className="following-container">
        <h2>Matches</h2>
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-border carousel-inner">
            <div class="people-card carousel-item active">
                <img src="https://www.randomdoggiegenerator.com/randomdoggie.php" class="card-pic d-block" width="250px" height="400px" alt="..."/>
                <p>Name here Name here Name here</p>
            </div>
            {matches.map ( follows => {
            return <div key={follows.user_id} className="carousel-item">
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

        


        {/* <h2>Followers</h2>
        {followers.map ( follows => {
            return <div key={follows.user_id} className="container">
                <p> { follows.user_first_name + " " + follows.user_last_name + " " + follows.user_age}</p>
            </div>
        })} */}

    </div>

}


export default Following;