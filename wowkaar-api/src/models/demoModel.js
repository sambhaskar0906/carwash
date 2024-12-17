const mongoose = require('mongoose')

const demoModel = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String }
})

const Demo = mongoose.model('demo', demoModel)
module.exports = Demo