const express = require('express')
const serviceReqModel = require('../models/servicesRequest')

exports.createServiceRequest = async (req, res) => {

    const { requestDate, pickupLocation, paymentMode, status, serviceId } = req.body

    try {
        if (!pickupLocation || !paymentMode || !status || !serviceId) {
            res.status(300).json({ message: 'All fields are mandatory', status: false, data: null })
        } else {
            const createServiceRequest = await serviceReqModel.create({
                userId: req.user.id,
                pickupLocation: pickupLocation,
                paymentMode: paymentMode,
                status: status,
                serviceId: serviceId

            });

            if (createServiceRequest) {
                res.status(200).json({ message: 'Service Request Successfully', status: true, data: createServiceRequest })
            } else {
                res.status(300).json({ message: 'Service Requset not created Please Try again Kindly fill the data', status: false, data: null })
            }
        }
    } catch (error) {
        console.log(error)
    }

}

exports.getallServiceReq = async (req, res) => {
    try {

        const getAllData = await serviceReqModel.find({})
        if (!getAllData) {
            res.status(300).json({ message: "Data is empty", status: false, data: null })
        } else {
            res.status(200).json({ message: "All data", status: true, data: getAllData })
        }

    } catch (error) {
        res.status(500).json({ message: "some internal error", status: false, data: null })
    }


}

exports.findserviceReqById = async (req, res) => {
    const id = req.params.id

    try {

        if (!id) {
            res.status(300).json({ message: 'All fields are mandatory', status: false, data: null })
        } else {

            const findData = await serviceReqModel.findById(id);
            if (!findData) {
                res.status(300).json({ message: 'No service request is exist', status: false, data: null })
            } else {
                res.status(200).json({ message: 'user find seccessfully', status: true, data: findData })
            }

        }

    } catch (error) {
        res.status(500).json({ message: "some internal error", status: false, data: null })
    }


}


exports.updateServiceReq = async (req, res) => {
    const id = req.params.id
    const { pickupLocation, paymentMode, status, serviceId } = req.body

    try {
        if (!pickupLocation || !paymentMode || !status || !serviceId) {
            res.status(300).json({ message: 'All fields are mandatory', status: false, data: null })
        }
        else {



            if (!id) {
                res.status(300).json({ message: 'Please mention your id', status: false, data: null })
            } else {
                const _id = id
                const findData = await serviceReqModel.findByIdAndUpdate(_id, {

                    pickupLocation: pickupLocation,
                    paymentMode: paymentMode,
                    status: status,
                    serviceId: serviceId

                });
                const findUpdatedData = await serviceReqModel.findById(id);
                if (!findUpdatedData) {
                    res.status(300).json({ message: 'No service request is exist', status: false, data: null })
                } else {
                    res.status(200).json({ message: 'user Updated seccessfully', status: true, data: findData })
                }

            }

        }

    } catch (error) {
        res.status(500).json({ message: "some internal error", status: false, data: null })
    }


}

exports.deleteServiceReq = async (req, res) => {
    const id = req.params.id

    try {

        if (!id) {
            res.status(300).json({ message: 'All fields are mandatory', status: false, data: null })
        } else {
            const findData = await serviceReqModel.findById(id);
            if (!findData) {
                res.status(300).json({ message: 'No service request exist', status: false, data: null })
            }
            else {
                const deletedData = await serviceReqModel.deleteOne({ _id: id })
                if (!deletedData) {
                    res.status(300).json({ message: 'No service request is exist', status: false, data: null })
                } else {
                    res.status(200).json({ message: 'user Deleted seccessfully', status: true, data: deletedData })
                }
            }



        }

    } catch (error) {
        res.status(500).json({ message: "some internal error", status: false, data: error })
        console.log(error)
    }
}