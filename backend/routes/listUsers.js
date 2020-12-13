const pool = require('../pool.js')

function listUsers(app,db){
    pool.connect( (err, client) => {
        if(err){
            console.log(err)
        }
        else{
            db = client
        }
    })

    app.get('/', (request, response) => {
        db.query(`SELECT * FROM users`, (err, result) => {
            if(err){
                console.log(err)
            }
            else {
                const { rows: users } = result;
                response.json(users)
            }
        })
    })
}
module.exports =  listUsers;