const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes');
const cors = require('cors');
const serviceRequestRoutes = require('./src/routes/serviceRequestRoutes');
const servicePlanRoutes = require('./src/routes/servicePlanRoutes.js')
const cleanTypeRoutes = require('./src/routes/cleanTypeRoutes.js')
const packageTypeRoutes = require('./src/routes/packageTypeRoutes.js')
const carCategoryRoutes = require('./src/routes/carCategoryRoutes.js')
const servicePackageRouter = require('./src/routes/servicePackageRoutes.js')
const contactusRoutes = require('./src/routes/contactUsRoutes.js')
const paymentRoutes = require('./src/routes/paymentRoutes.js')
const sendmailContactUsRouter = require('./src/routes/sendmailContactUs.js')

require('./src/Connections/connection.js');

const app = express();

// Middleware
app.use('/images', express.static('uploads'));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
// app.use("/", (req, res) => {
//     res.send({ message: "this is index page" })
// })
app.use('/v1/users', userRoutes);
app.use('/v1/serviceRequest', serviceRequestRoutes);
app.use('/v1/serviceplan', servicePlanRoutes);
app.use('/v1/cleantype', cleanTypeRoutes);
app.use('/v1/packagetype', packageTypeRoutes);
app.use('/v1/carcategory', carCategoryRoutes);
app.use('/v1/servicepackage', servicePackageRouter);
app.use('/v1/contactus', contactusRoutes);
app.use('/v1/payments', paymentRoutes);
app.use('/v1/sendmailcontact', sendmailContactUsRouter)

// Start the server
const port = config.port || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});