const mysql = require('mysql')
const process = require('process')
let db = false
let err = false

module.exports = {
    connect(){
        if( !db ) {
            db = mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE
            })

            db.connect( (connect_err) => {
                err = connect_err
            })
        }

        if (err) {
            return {status:400, error: 'DB error, please contact the administrator'}
        }

        return false
    },

    disconnect() {
        if (db) {
            db.end()
            db = null
        }
    },

    query( sql, values, callback ) {
        db.query( sql, values, callback )
    }
}
