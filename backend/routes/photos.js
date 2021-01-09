const router = require('express').Router()
const pool = require('../pool.js')
const authorization = require('../middleware/authorization.js')


router.get("/retrieve/:type" , authorization, async (req, res) => {
    try {
        const { type } = req.params
        const photos= await pool.query("SELECT * FROM pictures where pic_type = $1 and user_id =$2" ,[type, req.user])

        if(type == 'posts'){
            const photos= await pool.query(`
            SELECT p.pic_id, p.pic_src, u.user_id, u.user_first_name 
            FROM pictures as p
            INNER JOIN users as u
            on p.user_id = u.user_id
            where pic_type = $1
            ORDER BY
            p.pic_id DESC` ,[type])
            res.json(photos.rows)
        }
        else{
            res.json(photos.rows[photos.rows.length - 1])
        }
        
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message)
    }
})

router.delete("/delete", authorization, async ( req, res ) => {
    try {
        
        const deletePhoto = await pool.query("DELETE FROM pictures where pic_type = 'profile' and user_id = $1", [ req.user ])

        res.json("Profile uploaded")
    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message)
    }
})

module.exports = router