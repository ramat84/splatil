const Users = require('./controllers/Users' )
const UserValidation = require('./validations/UserValidation' )
const RoomValidation = require('./validations/RoomValidation' )
const Rooms = require('./controllers/Rooms')

module.exports = (app) => {
    app.post('/login',
        UserValidation.login,
        Users.login
    ),

    app.post('/register',
        UserValidation.signup,
        Users.signup
    )

    app.post('/room',
        RoomValidation.addRoom,
        Rooms.addRoom
    )

    app.post('/room/enter/:room_id',
        RoomValidation.enterRoom,
        Rooms.enterRoom
    )

    app.post('/room/exit/:room_id',
        RoomValidation.exitRoom,
        Rooms.exitRoom
    )

    app.post('/verify', Users.verifyToken)

    app.get('/rooms', Rooms.recent)
    app.get('/modes', Rooms.modes)
}
