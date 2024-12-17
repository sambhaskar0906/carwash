
const mongoose = require('mongoose')



// ServiceType, Amount, cardcontent.


const ServicePlanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default: " ",
    },

    ServiceType: {
        type: String,
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },

    cardcontent: {
        type: String,
        required: true
    }
},

    { Timestamp: true }

);

const servicePlanMod = mongoose.model('ServicePlan', ServicePlanSchema)
module.exports = servicePlanMod