const router = require("express").Router()
const pool = require("../pool")
const authorization = require("../middleware/authorization")



router.get("/", authorization, async (req, res) => {
    try {


        const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [req.user])


        res.json(user.rows[0])
    } catch (error) {
        console.error(error.message)
        res.status(500).json(error.message)
    }
})


module.exports = router;