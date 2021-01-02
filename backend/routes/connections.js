const router = require('express').Router()
const pool = require('../pool.js')
const authorization = require("../middleware/authorization.js")

router.get("/show/following", authorization, async (req, res) => {
    try {
        const connections = await pool.query(`
        select c.conn_id, u.user_first_name, u.user_last_name, u.user_id, u.user_age
        from connections as c 
            inner join users as u 
                on c.user2_id = u.user_id  where user1_id = $1`, [req.user])

                
        res.json(connections.rows)


    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message)
    }
})

router.get("/show/followers", authorization, async (req, res) => {
    try {
        const connections = await pool.query(`
        select c.conn_id, u.user_first_name, u.user_last_name, u.user_id, u.user_age
        from connections as c 
            inner join users as u 
                on c.user1_id = u.user_id  where user2_id = $1`, [req.user])

                
        res.json(connections.rows)


    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message)
    }
})

router.post("/add/:id" , authorization, async (req, res) => {
    try {
        
        const { id } = req.params;
        const connection = await pool.query("SELECT * FROM connections where user1_id = $1 and user2_id = $2" , [req.user, id])

        if(connection.rows.length > 0){
            return res.status(401).send("User already followed")
        }

        else{

            const newConnection = await pool.query("INSERT INTO connections VALUES(default, $1, $2)" , [
                req.user, id
            ])


        }






     } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message)

    }

    res.status(200).send("User added")
})

module.exports = router