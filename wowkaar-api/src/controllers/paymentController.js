const instance = require('../middleware/paymentMiddleware.js')
const config = require('../../config.js')
const crypto = require("crypto");


exports.createPayment = async (req, res) => {

    var options = { amount, currency, reciept } = req.body
    const order = await instance.orders.create(options)
    console.log("order", order)
    res.status(200).json({
        message: 'success',
        data: order
    })

}

exports.paymentVerification = async (req, res) => {

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body


    const hmac = crypto.createHmac('sha256', config.RAZOR_SECRET_KEY);

    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    let generatedSignature = hmac.digest('hex');

    let isSignatureValid = generatedSignature == razorpay_signature;
    console.log(isSignatureValid)


    if (isSignatureValid) {



        res.status(200).json({
            message: 'Success'
        })
    } else {
        res.status(400).json({
            message: 'Unsuccessfull'
        })
    }





}


exports.getKey = (req, res) => {
    res.status(200).json({ key: config.RAZOR_KEY_ID })
}