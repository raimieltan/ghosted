import pg from 'pg'

function connectDatabase(){
    const pool = new pg.Pool ({
        user        :   'postgres',
        password    :   'postgres',
        database    :   'ghosted',
        host        :   'localhost'
    })

    return pool
}

export default connectDatabase();