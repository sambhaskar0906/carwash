const mongoose = require('mongoose')


const servicePackageModel = new mongoose.Schema({
    // adminId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "user",
    //     default: " ",
    // },
    message: {
        type: Array,
        required: true
    },

    cleaningtype: {
        type: String,
        required: true
    },

    plantype: {
        type: String,
        required: true
    },
    cartype: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }

},

    { Timestamp: true }

);


const servicePackageSchema = mongoose.model('ServicePackage', servicePackageModel)
module.exports = servicePackageSchema