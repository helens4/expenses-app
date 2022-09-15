

const express = require('express')
const moment = require('moment')
const transactionModel = require('../models/Transaction')

const router = express.Router()

router.post('/add-transaction', async (req, res) => {

    try {
        const newTransaction = new transactionModel(req.body)
        await newTransaction.save()
        res.send('transaction added successfull')

    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/get-all-transactions', async (req, res) => {

    const { frequency, selectedRange, userId, type } = req.body

    try {
        const filterDate = moment().subtract(frequency, 'd').format(moment.HTML5_FMT.DATE)

        const transactions = await transactionModel.find({
            userId,
            ...(frequency !== 'custom' ? {
                date: {
                    $gt: filterDate
                }
            } : {
                date: {
                    $gte: moment(selectedRange[0]).format(moment.HTML5_FMT.DATE),
                    $lte: moment(selectedRange[1]).format(moment.HTML5_FMT.DATE)
                }
            }),
            ...(type != 'all' && { type })

        })

        res.send(transactions)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/edit-transaction', async (req, res) => {

    try {
        await transactionModel.findOneAndUpdate({ _id: req.body.transactionId }, req.body.payload)
        res.send('transaction updated successfull')

    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/delete-transaction', async (req, res) => {

    try {
        await transactionModel.findOneAndDelete({ _id: req.body.transactionId })
        res.send('transaction deleted successfull')

    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router