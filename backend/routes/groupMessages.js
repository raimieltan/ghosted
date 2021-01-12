const router = require('express').Router()
const pool = require("../pool")
const authorization = require("../middleware/authorization")
const { route } = require('./mail')


//get messages

router.get("/retrieve/:id", async (req, res) => {
    try {
        const { id } = req.params

        //query

        const messages = await pool.query(`
        SELECT u.user_first_name, m.message_content, m.message_id, g.group_id, g.group_name
            FROM messages as m
                INNER JOIN users as u
                    on u.user_id = m.user_id
                INNER JOIN groups as g
                    on g.group_id = m.group_id
        WHERE g.group_id = $1` , [id])

        res.json(messages.rows)

    } catch (error) {

        console.error(error.message)

        res.send(500).send(error.message)

    }
})

//post messages

router.post("/send/:id", authorization, async (req, res) => {
    try {

        //destructure
        const { id } = req.params
        const { message } = req.body

        //query
        const newMessage = await pool.query('INSERT INTO messages VALUES(default, $1, $2, $3)', [message, req.user, id])

        res.json('Message Sent')
    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message)
    }
})

module.exports = router;