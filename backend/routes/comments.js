const router = require('express').Router()
const pool = require('../pool.js')
const authorization = require('../middleware/authorization')


//get comments 
router.get('/retreive/:id', async ( req, res ) => {
    try {

        const { id } = req.params

        //query comments given picture id
    
        const comments = await pool.query("SELECT * FROM comments where pic_id = $1", [id])
    
        res.json(comments.rows)
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message)
    }

})

router.post('/add/:id' ,async ( req, res ) => {
    try {
        const { id } = req.params
        const { comment } = req.body

        const newComment = await pool.query("INSERT INTO comments VALUES(default, $1, $2)" , [ comment, id])
        
        res.json("Comment added")
    } catch (error) {

        console.error(error.message)
        res.status(500).send(error.message)
        
    }
})

//post comments