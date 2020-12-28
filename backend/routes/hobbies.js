const router = require('express').Router()
const pool = require('../pool.js')
const authorization = require("../middleware/authorization.js")


//get hobbies

router.get("/show", authorization, async (req, res) => {
    try {

        const hobbies = await pool.query("SELECT * FROM hobby WHERE user_id = $1", [req.user])

        res.json(hobbies.rows)
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message)
    }
})

router.post("/add" ,authorization, async (req, res ) => {

    try {

        const { hobby_content } = req.body

        const newHoby = await pool.query("INSERT INTO hobby VALUES(default, $1, $2) RETURNING *" , [
            hobby_content, req.user
        ])
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message)
    }

    res.status(200).send("Hobby added")

})

module.exports = router