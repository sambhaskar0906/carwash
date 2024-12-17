
const mongoose = require('mongoose')



// ServiceType, Amount, cardcontent.


const cleanType = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default: " ",
    },

    cleainingType: {
        type: Array,
        required: true
    },

},

    { Timestamp: true }

);

const cleanTypeSchema = mongoose.model('Cleantype', cleanType)
module.exports = cleanTypeSchema