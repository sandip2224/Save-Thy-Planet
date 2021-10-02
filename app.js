const express = require('express')
const path = require('path')
require('dotenv').config({ path: './config.env' })

const app = express()

// EJS setup
app.set('view engine', 'ejs');

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require("./routes/index"))

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server listening on port ${PORT}`))