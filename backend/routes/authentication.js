const router = require("express").Router();
const pool = require("../pool.js")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../jwt/jwtGenerator")
const authorization = require("../middleware/authorization")

//Register
router.post('/register', async (req, res) => {
    try {

        const { first_name, last_name, age, gender, bio, email, password } = req.body



        const user = await pool.query("SELECT * FROM USERS WHERE user_email = $1", [email])

        if (user.rows.length > 0) {
            return res.status(401).send("User already exist")
        }


        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query("INSERT INTO users(user_first_name, user_last_name, user_age, user_gender, user_bio, user_email, user_password) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *", [
            first_name, last_name, age, gender, bio, email, bcryptPassword
        ])

        const newPicture = await pool.query("INSERT INTO pictures VALUES (default, $1, $2, $3)", [
            'ghost.png', 'profile', newUser.rows[0].user_id
        ])


        const token = jwtGenerator(newUser.rows[0].user_id)
        res.json({ token })

    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
})

//login
router.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await pool.query("SELECT * FROM users where user_email = $1", [
            email
        ])

        if (user.rows.length === 0) {
            return res.status(401).json(("Password or Email is incorrect"))
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password)

        if (!validPassword) {
            return res.status(401).json("Password or Email is incorrect")
        }

        const token = jwtGenerator(user.rows[0].user_id)
        res.json({ token })

    } catch (error) {
        res.status(500).send(error.message)
    }
})




module.exports = router;