const express = require('express');
const servicePackageRouter = express.Router();
const app = express();
const validateTokenHandler = require('../middleware/validateTokenHandler.js')
const srvicePackageController = require('../controllers/servicePackageController.js')


servicePackageRouter.post('/create', srvicePackageController.createServicePackage)
servicePackageRouter.post('/update/:id', srvicePackageController.updateServicePackage)
servicePackageRouter.get('/getall', srvicePackageController.getAllServicePackage)
servicePackageRouter.delete('/delete/:id', srvicePackageController.deleteServicePackage)








module.exports = servicePackageRouter;  