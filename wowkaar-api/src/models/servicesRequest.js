const { Timestamp } = require('mongodb');
const mongoose = require('mongoose')



// userId, requestDate, pickupLocation, paymentMode, status(-1=reject, 0 = pending, 1 = accepted, 2 = complete), serviceId,



const ServiceRequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default: " ",
    },
    requestDate: {
        type: Date,
        default: new Date(),
        required: true

    },
    pickupLocation: {
        type: String,
        required: true
    },
    paymentMode: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        enum: [1, 2, 3]

    },
    serviceId: {
        type: Number,
        required: true,
        unique: true
    }
},

    { Timestamp: true }

);

const serviceRequstMod = mongoose.model('ServiceRequest', ServiceRequestSchema)
module.exports = serviceRequstMod