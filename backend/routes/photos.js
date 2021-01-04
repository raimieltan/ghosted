const router = require('express').Router()
const pool = require('../pool.js')
const authorization = require('../middleware/authorization.js')


router.get("/retrieve/:type" , authorization, async (req, res) => {
    try {
        const { type } = req.params
        const photos= await pool.query("SELECT * FROM picture where pic_type = $1 and user_id =$2" ,[type, req.user])

        res.json(photos.rows)
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message)
    }
})

module.exports = router