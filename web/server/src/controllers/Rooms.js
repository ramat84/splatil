const DB = require( './DB' )
const Users = require('./Users')
const fs = require('fs')
const process = require('process')

function joinUser(req, res, roomId, userId) {
    let err = DB.connect(res)

    if(err) {
        return res.status(err.status).send({error: err.error})
    }

    const insert_query = 'INSERT INTO `room_users` (`room_id`, `user_id` ) VALUES (?, ?)'
    const insert_values = [ roomId, userId ]

    try {
        DB.query( insert_query, insert_values, (err) => {
            if (err) {
                throw 'Unknow room user error'
            }
        })
    } catch (err) {
        throw 'Unknow room user db error'
    }
}

function updateVersion(force) {
        const file =  process.cwd()  + '/../static/room_version.json'

        if(!force && fs.existsSync(file)) {
            return
        }

        let version = Date.now()

        fs.writeFileSync(file,JSON.stringify({'version':version}))
}

module.exports = {
    init() {
        updateVersion(false)
    },

    recent(req,res) {
        let err = DB.connect(res)
        if(err)
            return res.status(err.status).send({error: err.error})

        let query_sql = ` 
            SELECT 
                rooms.*, 
                DATE_FORMAT('time', "%e %b %H:%i") as 'time',
                COUNT(room_users.user_id) as user_count,
                GROUP_CONCAT(room_users.user_id) as room_user_ids,
                GROUP_CONCAT(users.name SEPARATOR ", ") as room_user_names,
                modes.max_users,
                modes.icon
            FROM rooms 
                JOIN 'room_users' ON 'room_users'.'room_id' = 'rooms'.'id' 
                JOIN 'users' ON 'users'.'id' = 'room_users'.'user_id'
                JOIN 'modes' ON 'rooms'.'mode' = 'modes'.'id'
            WHERE 
                'time' >= CURDATE() 
            GROUP BY rooms.id 
            ORDER BY 'time' `

        query_sql = query_sql.replaceAll(`'`, '`')

        // console.log(query_sql)
        DB.query( query_sql, [], (err,qres) => {
            if (err) {
                return res.status(400).send( 'Unknow rooms error' ) 
            }

            return res.status(200).send( { rooms: qres } )
        })

        DB.disconnect();
    },

    modes(req,res) {
        let err = DB.connect(res)
        if(err)
            return res.status(err.status).send({error: err.error})

        const query_sql = 'SELECT * FROM modes order by `name`'

        DB.query( query_sql, [], (err,qres) => {
            if (err) {
                return res.status(400).send( 'Unknow modes error' ) 
            }

            let results = {};

            qres.forEach( (row) => {
                if (typeof row === 'object') {
                    const row_id = row.id+''
                    results['_' + row_id] = row
                }
            } )

            return res.status(200).send( { modes: results } )
        })

        DB.disconnect();
    },

    addRoom(req,res) {
        let err = DB.connect(res)

        if(err)
            return res.status(err.status).send({error: err.error})

        const insert_query = 'INSERT INTO `rooms` (`name`, `mode`, `time`) VALUES (?, ?, ?)'
        const time = `${req.body.date} ${req.body.hour}:${req.body.minute}`
        const insert_values = [ req.body.name, req.body.mode, time ]

        let user_id

        try {
            user_id = Users.getUserId(req)
        } catch (err) {
            return res.status(400).send(err)
        }

        DB.query( insert_query, insert_values, (err, qres) => {
            if (err )
                return res.status(400).send(`Can't create a room`)

            const room_id = qres.insertId

            try {
                joinUser(req, res, room_id, user_id)
            } catch (err) {
                return res.status(400).send( { error: err } ) 
            }

            updateVersion(true)
            res.status(200).send({
                status: 'success',
                id: room_id
            })
        })

        DB.disconnect();
    },

    enterRoom(req, res) {
        const room_id = req.params.room_id;

        let user_id
        try {
            user_id = Users.getUserId(req)
        } catch (err) {
            return res.status(400).send(err)
        }

        const exit_query = 'INSERT INTO room_users(room_id, user_id) VALUES(?,?)'
        const exit_params = [room_id, user_id]

        let query_error
        DB.query(exit_query,exit_params, (err) => {
            if (err) {
                query_error = {status: 400, error: `Can't add user to room`}
            }
        })

        if (query_error) {
            return res.status(query_error.status).send({error: query_error.error})
        }

        updateVersion(true)
        return res.status(200).send('success')
    },

    exitRoom(req, res) {
        const room_id = req.params.room_id;

        let user_id
        try {
            user_id = Users.getUserId(req)
        } catch (err) {
            return res.status(400).send(err)
        }

        const exit_query = 'DELETE FROM room_users WHERE room_id=? AND user_id=?'
        const exit_params = [room_id, user_id]

        let query_error
        DB.query(exit_query,exit_params, (err) => {
            if (err) {
                query_error = {status: 400, error: `Can't remove user from room`}
            }
            
            DB.query('DELETE FROM rooms WHERE id NOT IN (SELECT room_id FROM room_users)', [], (err) => {
                if (err) {
                    query_error = {status: 400, error: `Can't remove uneeded rooms`}
                }
            })
        })

        if (query_error) {
            return res.status(query_error.status).send({error: query_error.error})
        }

        updateVersion(true)
        return res.status(200).send('success')
    }
}
