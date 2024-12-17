const express = require('express');
const cleanTypeRouter = express.Router();
const app = express();
const CleantypeController = require('../controllers/cleanTypeController')
const validateTokenHandler = require('../middleware/validateTokenHandler')
cleanTypeRouter.post('/create', validateTokenHandler, CleantypeController.createCleanType)
cleanTypeRouter.post('/update/:id', validateTokenHandler, CleantypeController.updateCleanType)
cleanTypeRouter.delete('/delete', validateTokenHandler, CleantypeController.deleteCleanType)
cleanTypeRouter.get('/getall', CleantypeController.getallCleanType)






module.exports = cleanTypeRouter