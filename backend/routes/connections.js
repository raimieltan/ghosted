const router = require('express').Router()
const pool = require('../pool.js')
const authorization = require("../middleware/authorization.js")

router.get("/show/following" , authorization, async (req, res) => {
    try {

        const following = await pool.query(`
        select u.user_id, u.user_first_name, u.user_last_name, user_age 
            from connections as c 
                inner join users as u 
                    on c.user2_id = u.user_id 
            where c.user1_id = $1` , [req.user])

        res.json(following.rows)
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message)
    }
})

router.get("/show/followers" , authorization, async (req, res) => {
    try {

        const following = await pool.query(`
        select u.user_id, u.user_first_name, u.user_last_name, user_age 
            from connections as c 
                inner join users as u 
                    on c.user1_id = u.user_id 
            where c.user2_id = $1` , [req.user])

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
        const session = await pool.query("select * from connections where user1_id = $1 and user2_id = $2" , [req.user , id])
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
module.exports = router