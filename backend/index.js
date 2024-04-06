const express = require('express')
require('dotenv').config();
require('./controllers/db');
const AuthRouter = require('./routes/auth')
const studentRouter = require('./routes/student')
const {studentMiddleware,facultyMiddleware} = require('./controllers/middleware')
const session = require('express-session')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

app.use('/api/auth', AuthRouter)

app.use('/api/student',studentRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});