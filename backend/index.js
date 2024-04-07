const express = require('express')
require('dotenv').config();
require('./controllers/db');
const AuthRouter = require('./routes/auth')
const studentRouter = require('./routes/student')
const facultyRouter = require('./routes/faculty')
const {studentMiddleware,facultyMiddleware} = require('./controllers/middleware')
const session = require('express-session')
const passport = require('passport')

const cors = require('cors')

const app = express()

app.use(cors())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', AuthRouter)

app.use('/api/student',studentMiddleware,studentRouter)

app.use('/api/faculty',facultyMiddleware,facultyRouter);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});