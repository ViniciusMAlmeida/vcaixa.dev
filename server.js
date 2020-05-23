require('dotenv').config()

const express = require('express')
const routes = require('./src/routes')
const mongoose = require('mongoose')
const mongoConfig = require('./mongoConfig')

const app = express()
app.use(express.json())

mongoose.connect(process.env.DB_NAME, mongoConfig)

app.use('/api', routes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})