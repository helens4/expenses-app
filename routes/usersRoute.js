
const express = require('express')
const userModel = require('../models/User')

const router = express.Router()

router.post('/register', async (req, res) => {

    try {
        const newUser = new userModel(req.body)
        await newUser.save()
        res.send('user registration successfull')

    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/login', async (req, res) => {

    try {
        const result = await userModel.findOne({ email: req.body.email, password: req.body.password })

        if (result) {
            res.send(result)
        } else {
            res.status(500).json('error')
        }

    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router