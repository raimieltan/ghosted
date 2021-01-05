const router = require("express").Router()
const pool = require("../pool")
const authorization = require("../middleware/authorization")

router.get("/retrieve" , authorization, async( req, res ) => {
    try {
        const mail = await pool.query("SELECT * FROM messages WHERE receiver_id = $1" , [
            req.user
        ])

        res.json(mail.rows)
        
    } catch (error) {
        console.error(error.message)
        res.status(500).json(error.message)
    }
})

router.post("/send/:id" ,authorization, async(req, res) => {
    try {

        const { id } = req.params
        const { message } = req.body

        const newMail = await pool.query("INSERT INTO messages VALUES(default, $1, $2, $3)" , [req.user, id, message])

        res.json("Mail sent")
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message)
    }
})

module.exports = router