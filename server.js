const express = require('express')
const connection = require('./dbConnect')
const usersRoute = require('./routes/usersRoute')
const transactionsRoute = require('./routes/transactionsRoute')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/users', usersRoute)
app.use('/api/transactions', transactionsRoute)

const port = 5001

app.listen(port, () => console.log(`example app listening on port ${port}`))