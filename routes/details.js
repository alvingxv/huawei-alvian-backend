const express = require('express')
const details = express.Router()

//Array memory storage
let memory_storage = []

//Endpoint to save data
details.post('/', (req, res) => {
    let { name, email, phone } = req.body

    memory_storage.push({ name, email, phone })

    res.json({
        message: "Data has been saved",
        status: 200
    })
})

//Endpoint to fetch data
details.get('/', (req, res) => {
    res.json({
        message: "Data has been fetched",
        status: 200,
        data: memory_storage
    })
})


module.exports = { details }