const router = require('express').Router()
const pool = require('../pool.js')
const authorization = require("../middleware/authorization.js")

router.get("/show/following" , authorization, async (req, res) => {
    try {

        const following = await pool.query(`
        SELECT u.user_id,p.pic_src,u.user_bio, u.user_first_name, u.user_last_name, user_age 
        FROM connections as c 
            INNER JOIN users as u 
                on c.user2_id = u.user_id 
            INNER JOIN pictures as p on c.user2_id = p.user_id   
        WHERE c.user1_id = $1 and p.pic_type = 'profile'` , [req.user])

        res.json(following.rows)
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message)
    }
})

router.get("/show/followers" , authorization, async (req, res) => {
    try {

        const following = await pool.query(`
        SELECT u.user_id 
            FROM connections as c 
                INNER JOIN users as u 
                    on c.user1_id = u.user_id 
                INNER JOIN pictures as p on c.user2_id = p.user_id
            WHERE c.user2_id = $1 and p.pic_type = 'profile'` , [req.user])

        res.json(following.rows)
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message)
    }
})

router.post("/add/:id",authorization, async(req, res) => {

    try {

        const { id } = req.params
    
        //check if there is a previous connection
        const session = await pool.query("SELECT * FROM connections WHERE user1_id = $1 and user2_id = $2" , [req.user , id])
        //make connection id

        if(session.rows.length > 0){
            return res.status(401).send("Followed already")
        }

    
        //make follow

        const connection = await pool.query("insert into connections values(default, $1, $2)" , [req.user, id])

        res.json("Successfully followed")
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send(error).message
    }
})

router.delete("/ghost/:id", authorization, async ( req, res ) => {
    try {

        const { id } = req.params
        
        const ghostUser = await pool.query("DELETE FROM connections where user1_id = $1 and user2_id = $2 RETURNING *", [ req.user, id ])

        res.json(ghostUser.rows[0])
    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message)
    }
})

module.exports = router