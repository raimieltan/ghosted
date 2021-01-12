const router = require('express').Router()
const pool = require('../pool.js')
const authorization = require('../middleware/authorization')


//get comments 
router.get('/retrieve/:id', async (req, res) => {
    try {

        const { id } = req.params

        //query comments given picture id

        const comments = await pool.query(`SELECT c.comment_id, c.comment_content, c.pic_id, u.user_first_name 
        FROM comments as c
        INNER JOIN users as u
        ON u.user_id = c.user_id
        WHERE pic_id = $1`, [id])

        res.json(comments.rows)

    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message)
    }

})

router.post('/add/:id', authorization, async (req, res) => {
    try {
        const { id } = req.params
        const { comment } = req.body

        const newComment = await pool.query("INSERT INTO comments VALUES(default, $1, $2, $3)", [comment, id, req.user])

        res.json("Comment added")
    } catch (error) {

        console.error(error.message)
        res.status(500).send(error.message)

    }
})

//post comments


module.exports = router