require('dotenv').config({ path: "./src/config/.env" })

const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const mongoConfig = require('./config/mongoConfig')

const app = express()
app.use(express.json())

mongoose.connect(process.env.DB_NAME, mongoConfig)

app.use('/api', routes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})