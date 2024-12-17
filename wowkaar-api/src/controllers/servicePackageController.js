
const servicePackageModel = require('../models/servicePackageModel.js')
const carTypeModel = require('../models/carCategoryModel')
const cleanTypeModel = require('../models/cleaningType')
const packageTypeModel = require('../models/packageTypeModel')








exports.createServicePackage = async (req, res) => {
    const { message, cleanType, cartype, packageType, price } = req.body;
    var sprice = parseInt(price)
    console.log("requesting body", cleanType, cartype, packageType, price, typeof price)

    try {
        if (!message || !cleanType || !cartype || !packageType) {
            return res.status(200).json({ message: 'Please provide a message and All fields are mandatory', status: false, data: null });
        }

        const [getAllCar, getAllClean, getAllPackage] = await Promise.all([
            carTypeModel.findOne(),
            cleanTypeModel.findOne(),
            packageTypeModel.findOne()
        ]);

        const newCartype = getAllCar.cartype.map(e => e.toLowerCase());
        console.log(newCartype);

        const newcleaningtype = getAllClean.cleainingType.map(e => e.toLowerCase());
        console.log(newcleaningtype);

        const newpackage = getAllPackage.packagetype.map(e => e.toLowerCase());
        console.log(newpackage);

        const compareCleantype = newcleaningtype.includes(cleanType.toLowerCase());
        console.log(compareCleantype);

        const compareCartype = newCartype.includes(cartype.toLowerCase());
        console.log(compareCartype);

        const comparepackageType = newpackage.includes(packageType.toLowerCase());
        console.log(comparepackageType);

        if (!compareCleantype) {
            return res.status(200).json({ message: 'Cleantype missmatch' });
        }
        if (!compareCartype) {
            return res.status(200).json({ message: 'Cartype missmatch' });
        }
        if (!comparepackageType) {
            return res.status(200).json({ message: 'Packagetype missmatch' });
        }

        const createServicePackage = await servicePackageModel.create({
            message: message,
            cleaningtype: cleanType,
            plantype: packageType,
            cartype: cartype,
            price: sprice
        });

        if (!createServicePackage) {
            return res.status(200).json({ message: 'Failed to create service package', status: false, data: null });
        }

        return res.status(200).json({ message: 'Service package created successfully', status: true, data: createServicePackage });

    } catch (error) {
        console.error("Error creating service package:", error);
        return res.status(500).json({ message: "Internal server error", status: false, data: null });
    }
};


exports.updateServicePackage = async (req, res) => {
    const id = req.params.id;
    const { message, cleaningtype, cartype, plantype } = req.body;
    console.log("requesting body", cleaningtype, cartype, plantype, message, id);
    try {
        if (!message || !cleaningtype || !cartype || !plantype || !price) {
            return res.status(400).json({ message: 'Please provide a message and All fields are mandatory', status: false, data: null });
        }

        if (!id) {
            return res.status(400).json({ message: 'Please provide a valid ID', status: false, data: null });
        }

        const [getAllCar, getAllClean, getAllPackage, existingServicePackage] = await Promise.all([
            carTypeModel.findOne(),
            cleanTypeModel.findOne(),
            packageTypeModel.findOne(),
            servicePackageModel.findById(id)
        ]);

        const newCartype = getAllCar.cartype.map(e => e.toLowerCase());
        console.log(newCartype);

        const newcleaningtype = getAllClean.cleainingType.map(e => e.toLowerCase());
        console.log(newcleaningtype);

        const newpackage = getAllPackage.packagetype.map(e => e.toLowerCase());
        console.log(newpackage);

        const compareCleantype = newcleaningtype.includes(cleaningtype.toLowerCase());
        console.log(compareCleantype);

        const compareCartype = newCartype.includes(cartype.toLowerCase());
        console.log(compareCartype);

        const comparepackageType = newpackage.includes(plantype.toLowerCase());
        console.log(comparepackageType);

        if (!compareCleantype) {
            return res.status(404).json({ message: 'Cleaning type mismatch' });
        }
        if (!compareCartype) {
            return res.status(404).json({ message: 'Cartype mismatch' });
        }
        if (!comparepackageType) {
            return res.status(404).json({ message: 'Package type mismatch' });
        }

        const updatedServicePackage = await servicePackageModel.findByIdAndUpdate(id, {
            message: message,
            cleaningtype: cleaningtype.toUpperCase(),
            plantype: plantype.toUpperCase(),
            cartype: cartype.toUpperCase(),
            price: price
        });

        const updatedata = await servicePackageModel.findById(id)

        if (!updatedata) {
            return res.status(500).json({ message: 'Failed to update service package', status: false, data: null });
        }

        return res.status(200).json({ message: 'Service package updated successfully', status: true, data: updatedata });

    } catch (error) {
        console.error("Error updating service package:", error);
        return res.status(500).json({ message: "Internal server error", status: false, data: null });
    }
};


exports.getAllServicePackage = async (req, res) => {

    try {
        const getAll = await servicePackageModel.find({})
        if (!getAll) {
            return res.status(404).json({ Message: "The srvice package List is empty", status: false, data: getAll })

        }
        return res.status(200).json({ Message: "All Data", status: true, data: getAll })
    } catch (error) {
        throw new Error("Error fetching information: " + error.message);
    }


}

exports.deleteServicePackage = async (req, res) => {
    const id = req.params.id
    try {

        const findData = await servicePackageModel.findById(id)

        if (!findData) {
            return res.status(404).json({ Message: "The LIst is not find by this id", status: false, data: getAll })

        }
        return res.status(200).json({ Message: "Data Delete Successfully", status: true, data: findData })


    } catch (error) {

    }
}