const express = require('express');
const carCategoryRouter = express.Router();
const app = express();
const carCategoryController = require('../controllers/carCategoryController')
const validateTokenHandler = require('../middleware/validateTokenHandler')
carCategoryRouter.post('/create', validateTokenHandler, carCategoryController.createCarType)
carCategoryRouter.post('/update/:id', validateTokenHandler, carCategoryController.updateCarType)

carCategoryRouter.delete('/delete', validateTokenHandler, carCategoryController.deleteCarType)
carCategoryRouter.get('/getall', carCategoryController.getallCarType)







module.exports = carCategoryRouter