require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()


app.use(express.json())

const carRoutes = require('./routes/cars')
const userRoutes = require('./routes/user')


app.use('/api/cars', carRoutes)
app.use('/api/user', userRoutes)


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT || 4000, () => {
        console.log('Connected to DB & listening on port ' + process.env.PORT)
    })
})
.catch(err => console.log(err))