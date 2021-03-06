const router = require('express').Router()
const pool = require('../pool.js')
const authorization = require("../middleware/authorization.js")


//get hobbies

router.get("/show/:id", async (req, res) => {
    try {
        const { id } = req.params
        const hobbies = await pool.query("SELECT * FROM hobbies WHERE user_id = $1", [id])

        res.json(hobbies.rows)

    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message)
    }
})

router.post("/add", authorization, async (req, res) => {

    try {

        const { hobby } = req.body

        const newHoby = await pool.query("INSERT INTO hobbies VALUES(default, $1, $2)", [
            hobby, req.user
        ])

    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message)
    }

    res.status(200).send("Hobby added")

})

module.exports = router