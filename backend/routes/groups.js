const router = require('express').Router()
const pool = require('../pool')
const authorization = require('../middleware/authorization')


router.get("/retrieve/", async (req, res) => {
    try {


        const groupQuery = await pool.query(`SELECT * FROM groups`)


        res.json(groupQuery.rows)


    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message)
    }
})

router.get("/retrieve/joined", authorization, async (req, res) => {
    try {

        //destructure params


        //check if user is in group
        const authCheck = await pool.query('SELECT * FROM group_sessions where user_id = $1', [req.user])


        if (authCheck.rows.length > 0) {
            //query group
            const groupQuery = await pool.query(`
                SELECT g.group_id, g.group_name
                FROM group_sessions AS gs 
                    INNER JOIN groups AS g 
                        ON g.group_id = gs.group_id
                    INNER JOIN users AS u 
                        ON u.user_id = gs.user_id
                WHERE u.user_id = $1`, [req.user])


            res.json(groupQuery.rows)
            //res json
        }

        else {
            res.json({ msg: `You are not part of any group : ${req.user} ${id}` })
        }



    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message)
    }
})



router.post("/join/:id", authorization, async (req, res) => {
    try {

        //destructure id

        const { id } = req.params

        //check if user is in group
        const authCheck = await pool.query('SELECT * FROM group_sessions where user_id = $1 and group_id = $2', [req.user, id])

        if (authCheck.rows.length < 1) {
            //add user
            const newUserInGroup = await pool.query('INSERT INTO group_sessions VALUES(default, $1, $2 )', [id, req.user])

            res.json({ joined: true })
        }
        else {
            res.json({ msg: "You are already in this group" })
        }

    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message)
    }
})

module.exports = router;