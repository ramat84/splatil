const Joi = require('joi')
const {validate} = require('./Validation')
const DB = require( '../controllers/DB' )
const Users = require('../controllers/Users')

async function isRoomUserConnected(room_id, user_id) {
    let err = DB.connect()

    if(err)
        throw {error: err.error}

    const query_sql = 'SELECT COUNT(*) as cnt FROM room_users WHERE room_id=? AND user_id=?'
    const query_params = [room_id,user_id]
    let is_connected = false

    return new Promise( (resolve, reject) => {
        DB.query( query_sql, query_params, (err,qres) => {
            if (err) {
                reject({status: false, error: 'Unknow connected room error'})
            }

            if(qres[0].cnt == '1') {
                is_connected = true
            }

            resolve({status: is_connected})
        })
    })
}

module.exports = {
    addRoom(req,res, next) {
        let got_err = false

        DB.connect()

        const query_sql = 'SELECT * FROM `modes` WHERE `id` = ?'
        const query_params = [ req.body.mode ]

        DB.query( query_sql, query_params, (err) => {
            if (err) {
                res.status(400).send('Request mode DB issue')
                got_err = true
            }
        })

        if( got_err )
            return false

        const schema = Joi.object({
            token: Joi.string().required(),
            name: Joi.string().label('Room Name').required().min(4),
            date: Joi.date().label('Date').required(),
            hour: Joi.number().label( 'Time' ).required().min(0).max(23),
            minute: Joi.number().label( 'Time' ).required().min(0).max(60),
            mode: Joi.number().label( 'Mode' ).min(1).required().messages({'number.min': 'Please select a mode from the list'})
        })

        validate(schema, req, res, next);
    },

    async enterRoom(req, res, next) {
        if(!Users.getUserId(req))
            return res.status(400).send({error: 'User not connected'})

        const user_id = Users.getUserId(req)

        try {
            const is_connected = await isRoomUserConnected(req.params.room_id, user_id)
            if( is_connected.status )
                return res.status(400).send({error: 'Already in this room'})
            next();
        } catch(err) {
            res.status(err.status).send(err.error);
        }
    },

    async exitRoom(req, res, next) {
        if(!Users.getUserId(req))
            return res.status(400).send({error: 'User not connected'})

        const user_id = Users.getUserId(req)

        try {
            const is_connected = await isRoomUserConnected(req.params.room_id, user_id)

            if( !is_connected.status ) {
                res.status(400).send({error: 'Not in this room'})
            } else {
                next();
            }
        } catch(err) {
            res.status(err.status).send(err.error);
        }
    }
}
