const express = require('express')
const paymentController = require('../controllers/paymentController.js')
const validateToken = require('../middleware/validateTokenHandler')

const router = express.Router()

router.post("/create", paymentController.createPayment)
router.post("/paymentverification", paymentController.paymentVerification)
router.get("/getkey", paymentController.getKey)

module.exports = router; 