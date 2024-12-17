
const mongoose = require('mongoose')



// ServiceType, Amount, cardcontent.


const packageType = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default: " ",
    },

    packagetype: {
        type: Array,
        required: true
    },

},

    { Timestamp: true }

);

const packeageTypeSchema = mongoose.model('PackageType', packageType)
module.exports = packeageTypeSchema