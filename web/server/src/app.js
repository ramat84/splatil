const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')
const rooms = require('./controllers/Rooms')
const process = require('process')
require('serve-static')

rooms.init()

const AllowOrigin = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
}

const app = express();
app.all('*', AllowOrigin)
app.use('/static', express.static(process.cwd() + '/../static'))
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

require('./routes')(app);

app.listen( config.port );

