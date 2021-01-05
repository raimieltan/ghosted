const router = require('express').Router()
const pool = require('../pool.js')
const authorization = require('../middleware/authorization')

//get ratings

router.get("/retrieve/:id", authorization, async (req,res) => {

    try {

        const { id } = req.params

    //query
    const ratings = await pool.query("SELECT * FROM ratings where user_id = $1" , [id])

   
    // console.log(typeof(ratings_array[0].rating))
    //get average
    
    
  
    const average = (ratings.rows.reduce( (total, next) =>  total + next.rating , 0) ) / ratings.rows.length

  



    //res.json
    res.json(average.toFixed(2))
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message)
    }

})

//post ratings

router.post("/rate/:id", authorization, async(req, res) => {

    //trycatch
    try {
        const { id } = req.body
        const { rating } = req.body
        const newRating = await pool.query("INSERT INTO ratings values(default, $1, $2 ", [rating, id])

        res.json("User rated")


        
    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message)
    }

} )


module.exports = router;