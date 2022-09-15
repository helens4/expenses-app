const mongoose = require('mongoose')

const connectionAddress = 'mongodb+srv://rafal:rafal1@cluster0.dt37ggf.mongodb.net/expenses-app'

//mongodb+srv://rafal:rafal1@cluster0.dt37ggf.mongodb.net/doctors-app
//mongodb+srv://<username>:<password>@cluster0.dt37ggf.mongodb.net/test

mongoose.connect(connectionAddress,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

const connection = mongoose.connection

connection.on('error', err => console.log(err))
connection.on('connected', () => console.log('mongo db connection successfull'))

module.exports = connection

