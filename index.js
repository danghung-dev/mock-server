require('dotenv').config();

const http = require('http')
const express = require('./services/express')
const api = require('./routes')
const config = require('./config/config')

let app = express('/mock', api)
app.server = http.createServer(app)

app.server.listen(config.port, () => {
    console.log(`Started on port ${app.server.address().port}`)
})

module.exports = app

