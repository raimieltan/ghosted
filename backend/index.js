const bodyParser = require( 'body-parser');
const pool = require('./pool.js')
const listUsers = require('./routes/listUsers.js')
const express = require("express")
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded( {extended: true}))


app.use("/auth" , require("./routes/jwtAuth.js"));

app.use("/dashboard", require("./routes/dashboard.js"))

let db;


pool.connect( (err,client) => {
    if(err){

        console.log(err)
    }
    else{
        db = client
        app.listen(8000, () => {
            console.log('Server has started on http://localhost:8000')
        })
    }   
} )

listUsers(app, db)