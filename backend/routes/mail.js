const router = require("express").Router()
const pool = require("../pool")
const authorization = require("../middleware/authorization")

router.get("/retrieve" , authorization, async( req, res ) => {
    try {
        const mail = await pool.query(`SELECT p.pic_src, u.user_first_name, m.message_content, m.created_at
        FROM mails as m
        INNER JOIN pictures AS p
        ON p.user_id = m.sender_id
        INNER JOIN users as u
        ON u.user_id = m.sender_id
        WHERE p.pic_type = 'profile' AND receiver_id = $1`, [
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

        const newMail = await pool.query("INSERT INTO mails VALUES(default, $1, $2, $3)" , [req.user, id, message])

        res.json("Mail sent")
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message)
    }
})

module.exports = router