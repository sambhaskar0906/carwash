const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')
// firstName, lastName, email, address, contact, altNumber, message, messageTitle
const contactUsSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true

    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    messagetitle: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }


},
    {
        Timestamp: true
    }
)


const contactusSchema = mongoose.model('contactus', contactUsSchema)
module.exports = contactusSchema