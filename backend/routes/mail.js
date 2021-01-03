const router = require("express").Router()
const pool = require("../pool")
const authorization = require("../middleware/authorization")

router.get("/retrieve" , authorization, async( req, res ) => {
    try {
        const mail = await pool.query("SELECT * FROM message WHERE receiver_id = $1" , [
            req.user
        ])

        res.json(mail.rows)
        
    } catch (error) {
        console.error(error.message)
        res.status(500).json(error.message)
    }
})

module.exports = router