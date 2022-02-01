const crypto = require('crypto')
const DB = require('./DB')
const config = require('../config/config')
const jwt = require('jsonwebtoken')

function jwtConnect(user) {
    return jwt.sign({ 
        data: user, 
    }, 
    config.jwt.secret, {
        expiresIn: config.jwt.expire
    })
}

module.exports = {
    signup(req,res) {
        let err = DB.connect(res)

        if(err)
            return res.status(err.status).send({error: err.error})

        const query_sql = 'INSERT INTO users( `name`, `email`, `pass` ) VALUES ( ?, ?, ? )';
        const hashed_password = crypto.createHash('md5').update(req.body.password).digest('hex')

        const query_values = [ 
            req.body.nickname,
            req.body.email,
            hashed_password
        ]

        DB.query( query_sql, query_values, (err,qres) => {
            if(err)  {
                let err_msg;
                if( err.code == 'ER_DUP_ENTRY' ) {
                    err_msg = 'Nickname or Email already exists';
                } else {
                    err_msg = 'Something went wrong'
                }
                res.status(400).send({error: err_msg})
            } else {
                const query_sql = 'SELECT * FROM `users` WHERE id = ?';

                DB.query( query_sql, [ qres.insertId ], (err, result_users) => {
                    res.status(200).send({
                        message: 'success',
                        token: jwtConnect(JSON.stringify(result_users[0])),
                        nickname: result_users[0].name
                    })
                } )
            }

            DB.disconnect();
        });
    },

    login(req,res) {
        let err = DB.connect()

        if(err) 
            return res.status(err.status).send({error: err.error})

        const query_sql = 'SELECT * FROM `users` WHERE ? IN ( `name`, `email` )';
        const hashed_password = crypto.createHash('md5').update(req.body.password).digest('hex')

        const query_values = [ 
            req.body.user
        ]

        DB.query( query_sql, query_values, (err, result_users) => {
            let err_send = false;

            if(err) 
                err_send = { message: 'Something went wrong' }
            else if(result_users.length == 0)
                err_send = { message: 'User name not found' }
            else if(hashed_password != result_users[0].pass)
                err_send = { message: 'Wrong Password' }

            if( err_send )
                res.status(400).send({error: err_send.message})
            else  {
                res.status(200).send({
                    message: 'success',
                    token: jwtConnect(JSON.stringify(result_users[0])),
                    nickname: result_users[0].name,
                    id: result_users[0].id
                });
            }

            DB.disconnect()
        });
    },

    getUserId(req) {
        const user = jwt.verify( req.body.token, config.jwt.secret )
        const data = JSON.parse(user.data)
        return data.id
    },

    verifyToken(req, res) {
        const user = jwt.verify( req.body.token, config.jwt.secret )
        if (!user )
            res.status(400).send('Cant auto connect')

        const data = JSON.parse(user.data)

        res.status(200).send({
            message: 'success',
            token: req.body.token,
            nickname: data.name,
            id: data.id
        });
    }
}
