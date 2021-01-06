import React, {useState} from "react"

const AddRating = ( {id} ) => {
    const [rating, setrating] = useState(0)

    const onChange = (e) => {

        setrating( e.target.value )
  

    }
    const onSubmitForm = async (e) => {
        e.preventDefault()
        const body = { rating }
        console.log(body)

        try {

            const response = await fetch(`http://localhost:8000/ratings/rate/${id}` , {
                method: "POST",
                headers: {
                    "Content-type" : "application/json",
                    token: localStorage.token,
                    
                },
                body: JSON.stringify(body)
            })

            
            
        } catch (error) {
            console.error(error.message)
            
        }

    }

    return (
        <div className = "container">
            <form onSubmit = {onSubmitForm}>
                <input type="number" name="rating" placeholder="rating" className="form-control my-3" value = {rating} onChange = {e => onChange(e)} />
              
                <button className = "btn btn-success btn-block">rate</button>
               
            </form>
        </div>
    )
    
}

export default AddRating;