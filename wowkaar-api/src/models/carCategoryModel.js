
const mongoose = require('mongoose')



// ServiceType, Amount, cardcontent.


const carCategory = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default: " ",
    },

    cartype: {
        type: Array,
        required: true
    },

},

    { Timestamp: true }

);

const carTypeSchema = mongoose.model('Cartype', carCategory)
module.exports = carTypeSchema