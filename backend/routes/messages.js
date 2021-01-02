const router = require('express').Router()
const pool = require('../pool.js')
const authorization = require("../middleware/authorization.js")
const { route } = require('./connections.js')

router.get("/retrieve/:id" ,async (req, res) => {
    try {
        const { id } = req.params
        const messages = await pool.query("SELECT * FROM messages where conn_id = $1", [id])
        
        res.json(messages)
        res.status(200).send("Messages retrieved")

    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message)
    }
})

router.post("/send/:id" , authorization, async (req, res) => {
    try {

        const { id } = req.params
        const { message_content } = req.body
        const newMessage = await pool.query("insert into messages values(default, $1, $2, $3, default)", [
            id, req.user, message_content
        ]);

        res.status(200).send("Message sent")
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message)
    }
})

module.exports = router