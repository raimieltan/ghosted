const router = require('express').Router()
const pool = require('../pool.js')
const authorization = require('../middleware/authorization')

//get ratings

router.get("/retrieve", authorization, async (req,res) => {

    try {

    //query
    const ratings = await pool.query("SELECT * FROM ratings where user_id = $1" , [req.user])

    const ratings_array = ratings.rows
    //get average

    const average = (ratings_array.reduce( (a, b) => a + b, 0)) / ratings_array.length



    //res.json
    res.json(average)
        
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
