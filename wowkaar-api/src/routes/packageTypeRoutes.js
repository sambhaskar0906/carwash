const express = require('express');
const packageTypeRouter = express.Router();
const app = express();
const packageTypeController = require('../controllers/packageTypeController')
const validateTokenHandler = require('../middleware/validateTokenHandler')
packageTypeRouter.use(validateTokenHandler)

packageTypeRouter.post('/create', packageTypeController.createPackageType)
packageTypeRouter.post('/update/:id', packageTypeController.updatePackageType)
packageTypeRouter.delete('/delete', packageTypeController.deletePackageType)
packageTypeRouter.get('/getall', packageTypeController.getallPackageType)






module.exports = packageTypeRouter