const router = require("express").Router();
const pool = require("../pool.js")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../jwt/jwtGenerator")
const validator = require("../middleware/validator")
const authorization = require("../middleware/authorization")

//Register
router.post('/register', validator, async (req, res) => {
    try {

        console.log(req)
        // destructure req.body
        // user_first_name ,
        // user_last_name ,
        // user_age,
        // user_password ,
        // user_email 

        const{ first_name, last_name, age, gender, bio, email, password } = req.body
       
        //check if the user exist

        const user = await pool.query("SELECT * FROM USERS WHERE user_email = $1", [email])

        if(user.rows.length > 0){
            return res.status(401).send("User already exist")
        }

        // hash the password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

        //enter new user in the database
        const newUser = await pool.query("INSERT INTO users(user_first_name, user_last_name, user_age, user_gender, user_bio, user_email, user_password) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *", [
            first_name, last_name, age, gender, bio, email, bcryptPassword
        ])

        //generate JWT

        const token = jwtGenerator(newUser.rows[0].user_id)
        res.json( {token} )

    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
})

//login
router.post("/login", validator, async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await pool.query("SELECT * FROM users where user_email = $1", [
            email
        ])

        if(user.rows.length === 0) {
            return res.status(401).json(("Password or Email is incorrect 1"))
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password)

        if(!validPassword){
            return res.status(401).json("Password or Email is incorrect 2")
        }
        
        const token = jwtGenerator(user.rows[0].user_id)
        res.json( {token} )

    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get("/is-verify",authorization, async (req, res) => {
    try {
        res.json(true)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
    }
})
module.exports = router;