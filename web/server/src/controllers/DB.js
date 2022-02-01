const mysql = require('mysql')
const config = require('../config/config')
let db = false
let err = false

module.exports = {
    connect(){
        if( !db ) {
            db = mysql.createConnection(config.db)

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
