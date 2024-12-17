
const mongoose = require('mongoose')


const activeUserModel = new mongoose.Schema({


    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: Number,
        required: true
    },
    token: {
        type: String,
        required: true
    }

},

    { Timestamp: true }

);

const activeUserScema = mongoose.model('activeUser', activeUserModel)
module.exports = activeUserScema