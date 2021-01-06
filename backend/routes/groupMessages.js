const router = require('express').Router()
const pool = require("../pool")
const authorization = require("../middleware/authorization")
const { route } = require('./mail')


//get messages

router.get("/retrieve/:id", async(req, res) => {
    try {
        const { id }  = req.params

        //query

        const messages = await pool.query(`
        SELECT u.user_first_name, m.message_content, m.message_id, g.group_name, p.pic_src
            FROM messages as m
                INNER users as u
                    on u.user_id = m.user_id
                INNER groups as g
                    on g.group_id = m.group_id
                INNER pictures as p
                    on p.user_id = u.user_id
        WHERE p.pic_type='profile' AND g.group_id = $1` , [id])

        res.json(messages.rows)
        
    } catch (error) {

        console.error(error.message)

        res.send(500).send(error.message)
        
    }
})

//post messages

router.get("/add/:id" , authorization, async ( req, res ) => {
    try {

        //destructure
        const { id } = req.params
        const { message } = req.body

        //query
        const newMessage = await pool.query('INSERT INTO messages VALUES(default, $1, $2, $3)' , [message, req.user, message])

        res.json('Message Sent')
    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message)
    }
})

