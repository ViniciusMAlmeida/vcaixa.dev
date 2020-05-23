const port = 3000
const express = require('express')
const routes = require('./routes')

const app = express()
app.use(express.json())

app.use('/api', routes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})