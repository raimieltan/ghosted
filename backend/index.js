const bodyParser = require( 'body-parser');
const pool = require('./pool.js')
const express = require("express")
const app = express()
const path = require('path')

const cors = require("cors");


app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded( {extended: true}))
app.use('/img', express.static( path.join(__dirname, 'public/uploads')))

app.use("/auth" , require("./routes/jwtAuth.js"));

app.use("/dashboard", require("./routes/dashboard.js"))

app.use("/users/", require("./routes/listUsers.js"))

app.use("/hobby", require("./routes/hobbies.js"))

app.use("/connections" , require("./routes/connections.js"))

app.use("/mail" , require("./routes/mail.js"))

app.use("/uploads", require('./routes/upload.js'))

app.use("/photos" , require("./routes/photos.js"))

app.use("/groups", require("./routes/groups.js"))


let db;

let PORT = 8000

pool.connect( (err,client) => {
    if(err){

        console.log(err)
    }
    else{
        db = client
        app.listen(PORT, () => {
            console.log(`Server has started on http://localhost:${PORT}`)
        })
    }   
} )
