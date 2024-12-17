const express = require('express');
const sendmailContactUsRouter = express.Router();
const sendmailContactController = require('../controllers/sendmailContactUsController.js')


sendmailContactUsRouter.post('/sendmail', sendmailContactController.sendmailfromContactUs)






module.exports = sendmailContactUsRouter;  