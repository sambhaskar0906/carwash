const express = require('express');
const servicePlanRouter = express.Router();
const app = express();
const ServicePlanController = require('../controllers/servicePlanController')
const validateTokenHandler = require('../middleware/validateTokenHandler')
servicePlanRouter.use(validateTokenHandler)

servicePlanRouter.post('/create', ServicePlanController.createServicePlan)
servicePlanRouter.get('/getserviceplan', ServicePlanController.getallServicePlan)
servicePlanRouter.get('/getplanbyid/:id', ServicePlanController.findservicePlanById)
servicePlanRouter.post('/updateplan/:id', ServicePlanController.updateServicePlan)
servicePlanRouter.delete('/deleteplan/:id', ServicePlanController.deleteServicePlan)




module.exports = servicePlanRouter;