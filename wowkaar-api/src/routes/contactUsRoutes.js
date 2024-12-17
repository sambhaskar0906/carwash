const express = require('express');
const contactUsRouter = express.Router();
const app = express();
const contactusController = require('../controllers/contactusController')
const validateTokenHandler = require('../middleware/validateTokenHandler')

contactUsRouter.post('/create', contactusController.createContactus)
contactUsRouter.get('/findall', contactusController.getAllContact)
contactUsRouter.delete('/delete/:id', contactusController.deleteContact)
contactUsRouter.patch('/update/:id', contactusController.updateContactus)





module.exports = contactUsRouter