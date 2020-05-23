require('dotenv').config()

const express = require('express')
const routes = require('./src/routes')

const app = express()
app.use(express.json())

app.use('/api', routes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})