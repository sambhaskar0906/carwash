const express = require('express');
const serviceRequestRouter = express.Router();
const app = express();
const validateTokenHandler = require('../middleware/validateTokenHandler')
const serviceRequestController = require('../controllers/serviceRequestController')

serviceRequestRouter.use(validateTokenHandler)

serviceRequestRouter.post('/createservice', serviceRequestController.createServiceRequest)

serviceRequestRouter.get('/getallservicereq', serviceRequestController.getallServiceReq)
serviceRequestRouter.get('/getservicereqbyid/:id', serviceRequestController.findserviceReqById)
serviceRequestRouter.post('/updateservicesreq/:id', serviceRequestController.updateServiceReq)
serviceRequestRouter.delete('/deleteservicesreq/:id', serviceRequestController.deleteServiceReq)




module.exports = serviceRequestRouter;