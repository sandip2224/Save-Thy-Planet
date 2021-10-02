const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

require('dotenv').config({ path: './config.env' })

const app = express()
const server = http.createServer(app)
const io = socketio(server)

// EJS setup
app.set('view engine', 'ejs');

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require("./routes/index"))

io.on('connection', (socket) => {
    console.log("New user connected");
});

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server listening on port ${PORT}`))