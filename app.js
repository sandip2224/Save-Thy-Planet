const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const methodOverride = require('method-override');
require('dotenv').config({ path: './config/config.env' })

const connectDB = require('./config/db')
require('./config/passsport')(passport)

connectDB()

const app = express()

// EJS setup
app.set('view engine', 'ejs');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongoUrl: process.env.MONGO_URI })
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method
        delete req.body._method
        return method
    }
}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require("./routes/index"))
app.use('/auth', require('./routes/auth'))

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server listening on port ${PORT}`))