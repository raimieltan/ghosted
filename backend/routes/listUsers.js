const router = require("express").Router()
const pool = require("../pool")
const authorization = require("../middleware/authorization")

router.get("/:age" , authorization, async( req, res ) => {
    try {
        const { age } = req.params
        const users = await pool.query(`SELECT u.user_id, p.pic_src, u.user_bio, u.user_first_name, u.user_last_name, user_age 
        FROM users as u
            INNER JOIN pictures as p on u.user_id = p.user_id
        WHERE u.user_id != $1 and p.pic_type = 'profile' 
        AND u.user_gender !=  (SELECT user_gender from users WHERE user_id = $1)
        AND u.user_age <= $2`, [req.user , age])

        res.json(users.rows)


    } catch (error) {
        console.error(error.message)
        res.status(500).json(error.message)
    }
})
module.exports =  router;

