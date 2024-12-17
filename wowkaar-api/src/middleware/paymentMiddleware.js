const Razorpay = require('razorpay');
const config = require('../../config.js')


var instance = new Razorpay({
    key_id: config.RAZOR_KEY_ID,
    key_secret: config.RAZOR_SECRET_KEY,
});

module.exports = instance