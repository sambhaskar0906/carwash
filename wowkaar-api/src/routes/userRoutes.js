const express = require('express')
const userController = require('../controllers/userController')
const validateToken = require('../middleware/validateTokenHandler')
const upload = require('../middleware/imageUploaderMiddleware')

const router = express.Router()
router.post('/updatestatus', userController.makeInactiveStatus)
router.get('/getallusers', userController.getAllUsers)
router.get('/filter', userController.getUserWithFilter)
router.post('/create-user', upload.single('profileImage'), userController.registerUsers)
router.post('/verfy-otp', userController.veriSingleOtp)
router.post('/user-login', userController.loginUser)
router.get('/current-user', validateToken, userController.currentUser)
router.post('/change-password-user-login', validateToken, userController.changePassword)
router.post('/send-otp-resetpassword', userController.sendOtpToResetPassword)
router.post('/change-password-with-otp', userController.changePasswordByotp)
router.post('/update-user', validateToken, upload.single('profileImage'), userController.updatedUser)

module.exports = router;    