import express from 'express';
import bodyParser from 'body-parser';
import pool from './pool.js'
import listUsers from './routes/listUsers.js'
import cors from 'cors'

const app = express();

app.use(bodyParser.urlencoded( {extended: true}))
app.use(cors())


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